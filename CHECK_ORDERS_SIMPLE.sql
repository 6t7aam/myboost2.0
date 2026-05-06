-- ПРОВЕРКА 1: Посмотреть все заказы в базе данных
SELECT id, service, price, status, created_at, user_id
FROM public.orders
ORDER BY created_at DESC
LIMIT 20;
