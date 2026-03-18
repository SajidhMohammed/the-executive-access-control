-- Sales tracking table for recording product variant sales
create table public.sales (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null references auth.users (id) on delete CASCADE,
  variant_id uuid not null references public.variants (id) on delete CASCADE,
  quantity integer not null default 1,
  unit_price numeric(12, 2) not null,
  courier_fee numeric(12, 2) null default 0,
  sold_to text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint sales_pkey primary key (id)
) TABLESPACE pg_default;

-- Create trigger for updated_at
create trigger update_sales_updated_at BEFORE
update on public.sales for EACH row
execute FUNCTION update_updated_at_column ();

-- Enable RLS
alter table public.sales enable row level security;

-- Policies for sales
create policy "Users can view their own sales" on public.sales
  for select using (auth.uid() = user_id);

create policy "Users can insert their own sales" on public.sales
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own sales" on public.sales
  for update using (auth.uid() = user_id);

create policy "Users can delete their own sales" on public.sales
  for delete using (auth.uid() = user_id);
