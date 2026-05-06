# Исправления для отображения деталей заказа и email пользователей

## Проблемы, которые исправлены:

1. ✅ В админ-панели показывается "Guest" вместо email пользователя
2. ✅ В деталях заказа не показываются конкретные опции заказа (только название сервиса)

## Что было сделано:

### 1. База данных
- Добавлено поле `order_details` (JSONB) в таблицу `orders` для хранения полной информации о заказе
- Добавлена политика для админа, чтобы он мог читать email всех пользователей из таблицы `profiles`

### 2. Код приложения
- **OrderPage.tsx**: Обновлен для сохранения детальной информации о заказе в поле `order_details`
- **AdminPage.tsx**: Обновлен для отображения деталей заказа (опций) в списке заказов
- **AdminOrderDetailsPage.tsx**: Обновлен для отображения полной информации о заказе с опциями

## Как применить изменения:

### Шаг 1: Применить миграцию базы данных

Откройте Supabase Dashboard → SQL Editor и выполните следующий SQL:

```sql
-- Add order_details column to store detailed order information
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS order_details JSONB;

COMMENT ON COLUMN public.orders.order_details IS 'Detailed order information including options and configurations';

-- Add policy for admins to read all profiles (to see user emails)
CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE user_id = auth.uid()
      AND email = 'myboost.services@gmail.com'
    )
  );
```

### Шаг 2: Задеплоить обновленный код

Код уже обновлен в следующих файлах:
- `src/pages/OrderPage.tsx`
- `src/pages/AdminPage.tsx`
- `src/pages/AdminOrderDetailsPage.tsx`

Просто задеплойте изменения на Vercel:

```bash
git add .
git commit -m "Fix order details display and admin email access"
git push
```

## Что изменится после применения:

### В списке заказов (AdminPage):
- Вместо "Guest" будет показываться реальный email пользователя
- Под названием сервиса будут показаны все опции заказа (например: "Current Rank: Silver", "Desired Rank: Gold")

### В деталях заказа (AdminOrderDetailsPage):
- Email пользователя будет отображаться корректно
- Все детали заказа будут показаны в красивых карточках с опциями

### Для новых заказов:
- Вся информация о заказе (игра, сервис, опции, промокод, тип бустера) будет сохраняться в поле `order_details`
- Старые заказы останутся без изменений (у них `order_details` будет `null`)

## Проверка после применения:

1. Войдите в админ-панель (`/admin`)
2. Проверьте, что в списке заказов показываются email пользователей вместо "Guest"
3. Создайте новый тестовый заказ
4. Проверьте, что в деталях заказа отображаются все опции

## Важно:

- Изменения не ломают существующий функционал
- Старые заказы продолжат работать (просто без детальной информации)
- Новые заказы будут содержать полную информацию
