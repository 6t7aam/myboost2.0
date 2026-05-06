-- ПРОВЕРКА: Посмотреть все заказы в базе данных
SELECT id, service, price, status, created_at, user_id
FROM public.orders
ORDER BY created_at DESC
LIMIT 20;

-- ПРОВЕРКА: Посмотреть политики для таблицы orders
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'orders';

-- ПРОВЕРКА: Посмотреть политики для таблицы profiles
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'profiles';
