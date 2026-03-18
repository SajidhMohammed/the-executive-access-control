-- Orders and Order Items schema for multi-item transactions
create table public.orders (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null references auth.users (id) on delete CASCADE,
  customer_name text null,
  courier_fee numeric(12, 2) null default 0,
  total_amount numeric(12, 2) not null,
  status text not null default 'completed',
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint orders_pkey primary key (id)
) TABLESPACE pg_default;

create table public.order_items (
  id uuid not null default gen_random_uuid (),
  order_id uuid not null references public.orders (id) on delete CASCADE,
  variant_id uuid not null references public.variants (id) on delete CASCADE,
  quantity integer not null,
  unit_price numeric(12, 2) not null,
  created_at timestamp with time zone null default now(),
  constraint order_items_pkey primary key (id)
) TABLESPACE pg_default;

-- Create triggers for updated_at on orders
create trigger update_orders_updated_at BEFORE
update on public.orders for EACH row
execute FUNCTION update_updated_at_column ();

-- Enable RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies for orders
create policy "Users can view their own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Users can insert their own orders" on public.orders
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own orders" on public.orders
  for update using (auth.uid() = user_id);

create policy "Users can delete their own orders" on public.orders
  for delete using (auth.uid() = user_id);

-- Policies for order_items (via parent order ownership)
create policy "Users can view their own order_items" on public.order_items
  for select using (
    exists (
        select 1 from public.orders
        where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Users can insert their own order_items" on public.order_items
  for insert with check (
    exists (
        select 1 from public.orders
        where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Users can update their own order_items" on public.order_items
  for update using (
    exists (
        select 1 from public.orders
        where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Users can delete their own order_items" on public.order_items
  for delete using (
    exists (
        select 1 from public.orders
        where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );
