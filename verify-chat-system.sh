#!/bin/bash

# Order Chat System - Verification Script
# Run this after deploying to verify everything works

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     Order Chat System - Verification Script                    ║"
echo "║     MyBoost - Arena Breakout Infinite                          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
PASSED=0
FAILED=0

echo "🔍 Starting verification..."
echo ""

# 1. Check if migration file exists
echo "1️⃣  Checking migration file..."
if [ -f "supabase/migrations/20260502084829_create_order_messages.sql" ]; then
    echo -e "${GREEN}✅ Migration file exists${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ Migration file not found${NC}"
    ((FAILED++))
fi
echo ""

# 2. Check if components exist
echo "2️⃣  Checking components..."
if [ -f "src/components/OrderChat.tsx" ]; then
    echo -e "${GREEN}✅ OrderChat.tsx exists${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ OrderChat.tsx not found${NC}"
    ((FAILED++))
fi

if [ -f "src/components/OrderChatDialog.tsx" ]; then
    echo -e "${GREEN}✅ OrderChatDialog.tsx exists${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ OrderChatDialog.tsx not found${NC}"
    ((FAILED++))
fi
echo ""

# 3. Check if pages exist
echo "3️⃣  Checking pages..."
if [ -f "src/pages/AdminOrderDetailsPage.tsx" ]; then
    echo -e "${GREEN}✅ AdminOrderDetailsPage.tsx exists${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ AdminOrderDetailsPage.tsx not found${NC}"
    ((FAILED++))
fi
echo ""

# 4. Check if types are updated
echo "4️⃣  Checking TypeScript types..."
if grep -q "order_messages" "src/integrations/supabase/types.ts"; then
    echo -e "${GREEN}✅ order_messages types found${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ order_messages types not found${NC}"
    ((FAILED++))
fi

if grep -q "sender_type" "src/integrations/supabase/types.ts"; then
    echo -e "${GREEN}✅ sender_type field found${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ sender_type field not found${NC}"
    ((FAILED++))
fi
echo ""

# 5. Check if routes are added
echo "5️⃣  Checking routes..."
if grep -q "/admin/order/:orderId" "src/App.tsx"; then
    echo -e "${GREEN}✅ Admin order details route found${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ Admin order details route not found${NC}"
    ((FAILED++))
fi

if grep -q "AdminOrderDetailsPage" "src/App.tsx"; then
    echo -e "${GREEN}✅ AdminOrderDetailsPage imported${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ AdminOrderDetailsPage not imported${NC}"
    ((FAILED++))
fi
echo ""

# 6. Check if OrderStatusPage is updated
echo "6️⃣  Checking OrderStatusPage..."
if grep -q "OrderChat" "src/pages/OrderStatusPage.tsx"; then
    echo -e "${GREEN}✅ OrderChat component integrated${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ OrderChat component not integrated${NC}"
    ((FAILED++))
fi
echo ""

# 7. Check if AdminPage is updated
echo "7️⃣  Checking AdminPage..."
if grep -q "ExternalLink" "src/pages/AdminPage.tsx"; then
    echo -e "${GREEN}✅ View button added${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ View button not added${NC}"
    ((FAILED++))
fi
echo ""

# 8. Check documentation
echo "8️⃣  Checking documentation..."
DOCS=("ORDER_CHAT_SUMMARY.md" "ORDER_CHAT_IMPLEMENTATION.md" "ORDER_CHAT_SECURITY.md" "ORDER_CHAT_REALTIME.md" "ORDER_CHAT_DEPLOYMENT.md" "ORDER_CHAT_ARCHITECTURE.md")
for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✅ $doc exists${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ $doc not found${NC}"
        ((FAILED++))
    fi
done
echo ""

# 9. Check for Supabase connection
echo "9️⃣  Checking Supabase setup..."
if command -v supabase &> /dev/null; then
    echo -e "${GREEN}✅ Supabase CLI installed${NC}"
    ((PASSED++))

    # Check if Supabase is initialized
    if [ -d "supabase" ]; then
        echo -e "${GREEN}✅ Supabase project initialized${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ Supabase project not initialized${NC}"
        ((FAILED++))
    fi
else
    echo -e "${YELLOW}⚠️  Supabase CLI not installed (optional)${NC}"
fi
echo ""

# Summary
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    VERIFICATION SUMMARY                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "Tests Passed: ${GREEN}$PASSED${NC}"
echo -e "Tests Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ ALL CHECKS PASSED - READY FOR DEPLOYMENT! 🚀              ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: supabase db push"
    echo "2. Test customer flow"
    echo "3. Test admin flow"
    echo "4. Deploy to production"
    echo ""
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ SOME CHECKS FAILED - REVIEW ERRORS ABOVE                  ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Please fix the failed checks before deploying."
    echo ""
    exit 1
fi
