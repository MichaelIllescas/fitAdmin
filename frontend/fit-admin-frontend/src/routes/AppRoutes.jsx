import { Routes, Route } from "react-router-dom";
import DashboardPage from "../dashboard/pages/DashboardPage";
import MemberListPage from "../features/members/pages/MemberListPage";
import MemberCreatePage from "../features/members/pages/MemberCreatePage";

import RegisterPaymentPage from "../features/payments/pages/RegisterPaymentPage";
import RegisterFeePage from "../features/fees/pages/RegisterFeePage";
import FeeListPage from "../features/fees/pages/FeeListPage";
import RegisterAssistancePage from "../features/assistances/pages/RegisterAssistancePage";
import RegisterExpensePage from "../features/expenses/pages/RegisterExpensePage";
import ExpenseListPage from "../features/expenses/pages/ExpenseListPage";
import MonthlyIncomePage from "../features/finances/pages/MonthlyIncomePage";
import MonthlyExpensesPage from "../features/finances/pages/MonthlyExpensesPage";
import ProfitabilityPage from "../features/finances/pages/ProfitabilityPage";
import ComparativeChartsPage from "../features/finances/pages/ComparativeChartsPage";
import FinanceSummaryPage from "../features/finances/pages/FinanceSummaryPage";
import PaymentListPage from "../features/payments/pages/PaymentListPage";
import PaymentHistoryPage from "../features/payments/pages/PaymentHistoryPage";
import AssistanceHistoryPage from "../features/assistances/pages/AssistanceHistoryPage";
import AssistanceByDatePage from "../features/assistances/pages/AssistanceByDatePage";
import DailyIncomePage from "../features/finances/pages/DailyIncomePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Página principal */}
      <Route path="/" element={<DashboardPage />} />

      {/* Módulo: Socios */}
      <Route path="/socios" element={<MemberListPage />} />
      <Route path="/socios/nuevo" element={<MemberCreatePage />} />
      <Route path="/socios/pagos" element={<PaymentHistoryPage />} />
      <Route path="/socios/asistencias" element={<AssistanceHistoryPage />} />

      {/* Módulo: Pagos */}
      <Route path="/pagos/registrar" element={<RegisterPaymentPage />} />
      <Route path="/cuotas/nueva" element={<RegisterFeePage />} />
      <Route path="/cuotas" element={<FeeListPage />} />
      <Route path="/pagos/listado-general" element={<PaymentListPage />} />
      <Route path="/pagos/listado-socio" element={<PaymentHistoryPage />} />

      {/* Módulo: asistencias */}
      <Route path="/asistencias/listado" element={<AssistanceHistoryPage />} />
      <Route path="/asistencias/registrar" element={<RegisterAssistancePage />}/>
      <Route path="/asistencias/historial/:memberId" element={<AssistanceHistoryPage />} />
      <Route path="/asistencias/fecha" element={<AssistanceByDatePage />} />


      {/* Módulo: gastos */}
      <Route path="/gastos/registrar" element={<RegisterExpensePage />} />
      <Route path="/gastos" element={<ExpenseListPage />} />

      {/* Módulo: finanzas */}
            <Route path="/reportes/ingresos-diarios" element={<DailyIncomePage />} />

      <Route path="/reportes/ingresos" element={<MonthlyIncomePage />} />
      <Route path="/reportes/egresos" element={<MonthlyExpensesPage />} />
      <Route path="/reportes/rentabilidad" element={<FinanceSummaryPage />} />
    </Routes>
  );
};

export default AppRoutes;
