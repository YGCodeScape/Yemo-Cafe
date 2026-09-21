-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends Supabase auth.users)
create table public.profiles (
 id uuid references auth.users(id) on delete cascade primary key,
 full_name text,
 avatar_url text,
 phone text,
 created_at timestamptz default now()
);

-- Categories
create table public.categories (
 id uuid primary key default uuid_generate_v4(),
 name text not null,
 slug text unique not null,
 icon text,
 sort_order int default 0
);

-- Menu items
create table public.menu_items (
 id uuid primary key default uuid_generate_v4(),
 name text not null,
 description text,
 price numeric(10,2) not null,
 category_id uuid references public.categories(id),
 image_url text,
 tags text[] default '{}',
 is_available boolean default true,
 is_featured boolean default false,
 volume_ml int,
 temperature_options text[] default '{Hot,Iced}',
 milk_options text[] default '{Regular,Oat,Almond}',
 created_at timestamptz default now()
);

-- Tables (cafe tables with QR)
create table public.tables (
 id uuid primary key default uuid_generate_v4(),
 number int unique not null,
 qr_token text unique not null default uuid_generate_v4()::text,
 capacity int default 4,
 is_active boolean default true
);

-- Orders
create table public.orders (
 id uuid primary key default uuid_generate_v4(),
 user_id uuid references auth.users(id),
 table_id uuid references public.tables(id),
 status text default 'pending' check (status in ('pending','approved','preparing','ready','completed','cancelled')),
 total numeric(10,2) not null,
 note text,
 created_at timestamptz default now(),
 updated_at timestamptz default now()
);

-- Order items
create table public.order_items (
 id uuid primary key default uuid_generate_v4(),
 order_id uuid references public.orders(id) on delete cascade,
 menu_item_id uuid references public.menu_items(id),
 quantity int not null default 1,
 unit_price numeric(10,2) not null,
 customizations jsonb default '{}'
);

-- Reviews
create table public.reviews (
 id uuid primary key default uuid_generate_v4(),
 user_id uuid references auth.users(id),
 rating int check (rating between 1 and 5),
 comment text,
 created_at timestamptz default now()
);

-- Row Level Security
alter table public.profiles    enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews     enable row level security;
alter table public.menu_items  enable row level security;
alter table public.categories  enable row level security;
alter table public.tables      enable row level security;

-- Profiles: users can only see and edit their own
create policy "own profile" on public.profiles for all using (auth.uid() = id);

-- Orders: users can see and create their own
create policy "own orders" on public.orders for all using (auth.uid() = user_id);
create policy "own order items" on public.order_items for all
  using (order_id in (select id from public.orders where user_id = auth.uid()));

-- Menu, categories, tables: public read (no login required)
create policy "public menu"       on public.menu_items  for select using (true);
create policy "public categories" on public.categories  for select using (true);
create policy "public tables"     on public.tables      for select using (true);

-- Reviews: users manage their own
create policy "own reviews" on public.reviews for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
