import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { searchMember, registerPayment } from "../services/paymentService";
import { useNavigate } from "react-router-dom";

const useRegisterPayment = (initialMemberId = null, preloadedMember = null) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [member, setMember] = useState(preloadedMember || null);
  const [loading, setLoading] = useState(false);
  const [lastPayment, setLastPayment] = useState(
    preloadedMember?.lastPayment || null
  );

  const [formValues, setFormValues] = useState({
    feeTypeId: "",
    amountPaid: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "",
  });

  // ⚡ Cargar datos si el socio ya viene cargado desde la navegación
  useEffect(() => {
    if (preloadedMember) {
      setFormValues({
        feeTypeId: preloadedMember.feeTypeId,
        amountPaid: preloadedMember.feeType?.price || "",
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "",
      });
    }
  }, [preloadedMember]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const res = await searchMember(query);
      setMember(res.data.member);
      setLastPayment(res.data.lastPayment);

      if (res.data.lastPayment) {
        setFormValues((prev) => ({
          ...prev,
          feeTypeId: res.data.lastPayment.feeTypeId,
          amountPaid: res.data.lastPayment.amountPaid,
        }));
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se encontró el socio.", "error");
      setMember(null);
      setLastPayment(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!member) return Swal.fire("Error", "Buscá un socio primero.", "error");

    try {
      await registerPayment({
        memberId: member.id,
        ...formValues,
      });

      Swal.fire({
        icon: "success",
        title: "Pago registrado correctamente",
        timer: 1500,
        showConfirmButton: false,
      });

      setQuery("");
      setMember(null);
      setLastPayment(null);
      setFormValues({
        feeTypeId: "",
        amountPaid: "",
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "",
      });
      setTimeout(() => {
        navigate("/"); // o la ruta que uses para el dashboard
      }, 1500);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo registrar el pago.", "error");
    }
  };

  const getPaymentStatus = () => {
    if (!lastPayment) return { status: "Sin pagos registrados", expired: true };

    const fechaUltimoPago = new Date(lastPayment.paymentDate);
    const duracionDias = member.feeType.durationInDays;

    const fechaVencimiento = new Date(fechaUltimoPago);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + duracionDias);

    const hoy = new Date();
    const vencido = hoy > fechaVencimiento;

    return {
      status: `Último pago: ${fechaUltimoPago.toLocaleDateString()} (${
        vencido ? "VENCIDO" : "Vigente"
      })`,
      expired: vencido,
    };
  };

  return {
    query,
    setQuery,
    member,
    loading,
    formValues,
    setFormValues,
    handleSearch,
    handleSubmit,
    getPaymentStatus,
    lastPayment,
  };
};

export default useRegisterPayment;
