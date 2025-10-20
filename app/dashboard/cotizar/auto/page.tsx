"use client";

import { useRef, useState, useEffect, useCallback, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Car,
  Plus,
  Shield,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check, Loader2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "../../../providers/AuthProvider";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

// Helper: Swal dentro del DialogContent (target) para que los botones sean clicables
async function openSwal(
  options: SweetAlertOptions,
  targetEl: HTMLElement | null
): Promise<SweetAlertResult<any>> {
  return Swal.fire({
    returnFocus: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    target: targetEl ?? document.body,
    didOpen: () => {
      try {
        const container = Swal.getContainer();
        if (container) container.style.zIndex = "999999";
      } catch {}
    },
    ...options,
  });
}
function MarcaCombobox({
  value,
  onChange,
  options,
  disabled,
  errorClass,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
  errorClass?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const label = value || "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${errorClass ?? ""}`}
          disabled={disabled || options.length === 0}
        >
          {label || placeholder || "Seleccione marca"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar marca..." />
          <CommandEmpty>Sin resultados.</CommandEmpty>
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt}
                value={opt}
                onSelect={(currentValue) => {
                  onChange(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    value === opt ? "opacity-100" : "opacity-0"
                  }`}
                />
                {opt}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ModelCombobox({
  value,
  onChange,
  options,
  disabled,
  errorClass,
  placeholder = "Seleccione modelo",
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  disabled?: boolean;
  errorClass?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between bg-transparent", errorClass)}
          disabled={disabled}
        >
          {value ? value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
        <Command
          filter={(opt, search, keywords) => {
            const label = opt?.toLowerCase?.() ?? "";
            const s = search.toLowerCase();
            return label.includes(s) ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Buscar modelo..." />
          <CommandList>
            <CommandEmpty>
              {options.length ? "Sin coincidencias" : "Sin modelos"}
            </CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt}
                  value={opt}
                  onSelect={(val) => {
                    onChange(val);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const cotizacionesAuto = [
  {
    id: 1,
    cliente: "María González",
    vehiculo: "Toyota Corolla 2020",
    fecha: "2024-01-15",
    monto: "$1,200",
    estado: "Pendiente",
  },
  {
    id: 2,
    cliente: "Carlos Ruiz",
    vehiculo: "Honda Civic 2019",
    fecha: "2024-01-14",
    monto: "$1,450",
    estado: "Aprobada",
  },
  {
    id: 3,
    cliente: "Ana López",
    vehiculo: "Nissan Sentra 2021",
    fecha: "2024-01-13",
    monto: "$1,100",
    estado: "En Revisión",
  },
];

const beneficiosAuto = [
  {
    icon: Shield,
    titulo: "Cobertura Total",
    descripcion:
      "Protección completa contra daños, robo y responsabilidad civil",
  },
  {
    icon: Users,
    titulo: "Asistencia 24/7",
    descripcion: "Grúa, mecánico y asistencia vial las 24 horas del día",
  },
  {
    icon: Star,
    titulo: "Sin Deducible",
    descripcion: "Planes disponibles sin deducible para mayor tranquilidad",
  },
];

export default function CotizarAutoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialogContentRef = useRef<HTMLDivElement | null>(null);
  // 3.1 Lee sesión desde AuthProvider
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // ====== NUEVO: estado para marcas ======
  const [marcas, setMarcas] = useState<string[]>([]);
  const [isLoadingMarcas, setIsLoadingMarcas] = useState<boolean>(false);
  // ====== NUEVO: estado para modelos ======
  const [modelos, setModelos] = useState<string[]>([]);
  const [isLoadingModelos, setIsLoadingModelos] = useState(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    let cancelled = false;
    const fetchMarcas = async () => {
      setIsLoadingMarcas(true);
      try {
        const res = await fetch(`${API_BASE}/catalogos/marcas`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json(); // <-- ["AKT","BAIC",...]
        const list = Array.isArray(raw)
          ? raw
              .filter((x) => typeof x === "string")
              .map((x) => x.trim())
              .filter((x) => x.length > 0)
          : [];
        if (!cancelled) setMarcas(list);
      } catch (err) {
        console.error("Error cargando marcas:", err);
        if (!cancelled) {
          setMarcas([]);
          openSwal(
            {
              title: "No se pudieron cargar las marcas",
              text: "Intenta nuevamente en unos minutos.",
              icon: "error",
              confirmButtonText: "Cerrar",
            },
            dialogContentRef.current
          );
        }
      } finally {
        if (!cancelled) setIsLoadingMarcas(false);
      }
    };
    fetchMarcas();
    return () => {
      cancelled = true;
    };
  }, [API_BASE]);

  type Dep = { id: number; nombre: string };
  type Mun = { id: number; nombre: string; departamento_id: number };

  // ── listas y loaders (solo estado interno, NO van al form)
  const [deps, setDeps] = useState<Dep[]>([]);
  const [isLoadingDeps, setIsLoadingDeps] = useState(false);

  const [munsTitular, setMunsTitular] = useState<string[]>([]);
  const [isLoadingMunsTitular, setIsLoadingMunsTitular] = useState(false);

  const [munsAlterno, setMunsAlterno] = useState<string[]>([]);
  const [isLoadingMunsAlterno, setIsLoadingMunsAlterno] = useState(false);

  const [formData, setFormData] = useState({
    // Paso 1
    marca: "",
    modelo: "",
    año: "",
    // Paso 2
    tipoCobertura: "amplia",
    excesoRC: "",
    // Paso 3 (Cliente titular)
    primerNombre: "",
    segundoNombre: "",
    telefono: "",
    primerApellido: "",
    segundoApellido: "",
    celular: "",
    email: "",
    identificacion: "",
    departamento: "",
    municipio: "",
    direccion: "",
    parentesco: "",
    // NUEVO: alterno
    usarOtroNombre: false,
    altPrimerNombre: "",
    altSegundoNombre: "",
    altTelefono: "",
    altPrimerApellido: "",
    altSegundoApellido: "",
    altCelular: "",
    altEmail: "",
    altIdentificacion: "",
    altDepartamento: "",
    altMunicipio: "",
    altDireccion: "",
    altParentesco: "",
    // Paso 4
    chasis: "",
    motor: "",
    color: "",
    placa: "",
    usoVehiculo: "",
    vigencia: "",
    circulacionDueño: "si",
    vehiculoDañado: "no",
    cesionDerechos: "no",
    // Paso 5
    formaPago: "debito",
    aceptaTerminos: false,
    autorizaCorreo: false,
    circulacionArchivo: null as File | null, // archivo circulación
    cedulaArchivo: null as File | null, // archivo cédula
    compraventaArchivo: null as File | null, // archivo carta compraventa (si circulación = no)
    danoDescripcion: "", // descripción si el vehículo tiene daño
    cesionEntidad: "", // entidad si hay cesión de derechos
  });

  useEffect(() => {
    // si no hay marca, limpiamos modelos y salimos
    if (!formData.marca) {
      setModelos([]);
      return;
    }

    let cancelled = false;
    const fetchModelos = async () => {
      setIsLoadingModelos(true);
      try {
        const url = `${API_BASE}/catalogos/modelos?marca=${encodeURIComponent(
          formData.marca
        )}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setModelos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando modelos:", err);
        if (!cancelled) {
          setModelos([]);
          openSwal(
            {
              title: "No se pudieron cargar los modelos",
              text: "Intenta nuevamente en unos minutos.",
              icon: "error",
              confirmButtonText: "Cerrar",
            },
            dialogContentRef.current
          );
        }
      } finally {
        if (!cancelled) setIsLoadingModelos(false);
      }
    };

    fetchModelos();
    return () => {
      cancelled = true;
    };
  }, [formData.marca, API_BASE]);

  // Años (dependen de marca + modelo)
  const [anios, setAnios] = useState<number[]>([]);
  const [isLoadingAnios, setIsLoadingAnios] = useState(false);
  const [openAnio, setOpenAnio] = useState(false);
  const [queryAnio, setQueryAnio] = useState("");

  // Si cambia marca o modelo, resetea año y lista
  useEffect(() => {
    setFormData((prev) => ({ ...prev, año: "" }));
    setAnios([]);
    setQueryAnio("");
  }, [formData.marca, formData.modelo]);

  // Fetch de años cuando hay marca + modelo
  useEffect(() => {
    if (!formData.marca || !formData.modelo) return;
    let cancelled = false;

    const fetchAnios = async () => {
      setIsLoadingAnios(true);
      try {
        const qs = new URLSearchParams({
          marca: formData.marca,
          modelo: formData.modelo,
        }).toString();

        const res = await fetch(`${API_BASE}/catalogos/anios?${qs}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setAnios(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando años:", err);
        if (!cancelled) setAnios([]);
        // (opcional) mostrar swal de error si quieres
        // await openSwal({ ... }, dialogContentRef.current)
      } finally {
        if (!cancelled) setIsLoadingAnios(false);
      }
    };

    fetchAnios();
    return () => {
      cancelled = true;
    };
  }, [API_BASE, formData.marca, formData.modelo]);

  type ItemCobertura = {
    nombre: string;
    sumaAsegurada?: number | null;
    sumaAseguradaLabel?: string;
    deducible?: string;
    prima: number;
  };

  const [itemsCobertura, setItemsCobertura] = useState<ItemCobertura[]>([]);
  const [totalPaso2, setTotalPaso2] = useState(0);
  const [isLoadingCalc, setIsLoadingCalc] = useState(false);

  useEffect(() => {
    // Requiere selección completa
    if (!formData.marca || !formData.modelo || !formData.año) {
      setItemsCobertura([]);
      setTotalPaso2(0);
      return;
    }

    let cancelled = false;
    const fetchCalc = async () => {
      setIsLoadingCalc(true);
      try {
        const qs = new URLSearchParams({
          marca: formData.marca,
          modelo: formData.modelo,
          anio: String(formData.año),
          tipoCobertura: formData.tipoCobertura,
          excesoRC: formData.excesoRC || "0",
        });
        const res = await fetch(`${API_BASE}/cotizaciones/auto/calculo?${qs}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setItemsCobertura(Array.isArray(data.items) ? data.items : []);
          setTotalPaso2(Number(data.totalPaso2 ?? 0));
        }
      } catch (err) {
        console.error("Error calculando paso 2:", err);
        if (!cancelled) {
          setItemsCobertura([]);
          setTotalPaso2(0);
          openSwal(
            {
              title: "No se pudo calcular la prima",
              text: "Verifica marca, modelo y año; luego intenta de nuevo.",
              icon: "error",
              confirmButtonText: "Cerrar",
            },
            dialogContentRef.current
          );
        }
      } finally {
        if (!cancelled) setIsLoadingCalc(false);
      }
    };

    fetchCalc();
    return () => {
      cancelled = true;
    };
    // Dependencias: cuando cambie selección o tipo de cobertura/exceso
  }, [
    API_BASE,
    formData.marca,
    formData.modelo,
    formData.año,
    formData.tipoCobertura,
    formData.excesoRC,
  ]);

  // Departamentos (lista única para toda la pantalla)
  const [departamentos, setDepartamentos] = useState<string[]>([]);
  const [isLoadingDepartamentos, setIsLoadingDepartamentos] = useState(false);

  // Municipios para titular
  const [municipiosTitular, setMunicipiosTitular] = useState<string[]>([]);
  const [isLoadingMunicipiosTitular, setIsLoadingMunicipiosTitular] =
    useState(false);

  // Municipios para alterno
  const [municipiosAlterno, setMunicipiosAlterno] = useState<string[]>([]);
  const [isLoadingMunicipiosAlterno, setIsLoadingMunicipiosAlterno] =
    useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchDepartamentos = async () => {
      setIsLoadingDepartamentos(true);
      try {
        const res = await fetch(`${API_BASE}/catalogos/departamentos`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        // 🔧 normaliza a string[] usando 'name' (no 'nombre')
        const list = Array.isArray(raw)
          ? raw
              .map((x: any) => (typeof x === "string" ? x : x?.name)) // <- name
              .filter((s: any) => typeof s === "string")
              .map((s: string) => s.trim()) // quita espacios "Managua "
              .filter(Boolean)
              .filter((s: string, i: number, a: string[]) => a.indexOf(s) === i) // únicos
              .sort((a: string, b: string) => a.localeCompare(b, "es"))
          : [];
        if (!cancelled) setDepartamentos(list);
      } catch (err) {
        console.error("Error cargando departamentos:", err);
        if (!cancelled) setDepartamentos([]);
      } finally {
        if (!cancelled) setIsLoadingDepartamentos(false);
      }
    };
    fetchDepartamentos();
    return () => {
      cancelled = true;
    };
  }, [API_BASE]);

  useEffect(() => {
    let cancelled = false;

    const fetchMunicipiosTitular = async () => {
      setMunicipiosTitular([]);
      const dep = (formData?.departamento || "").trim();
      if (!dep) return;

      setIsLoadingMunicipiosTitular(true);
      try {
        const url = `${API_BASE}/catalogos/municipios?departamento=${encodeURIComponent(
          dep
        )}`;
        const res = await fetch(url, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        const list = Array.isArray(raw)
          ? raw
              .map((x) => (typeof x === "string" ? x : x?.nombre))
              .filter((s) => typeof s === "string")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];
        if (!cancelled) setMunicipiosTitular(list);
      } catch (err) {
        console.error("Error cargando municipios (titular):", err);
        if (!cancelled) setMunicipiosTitular([]);
      } finally {
        if (!cancelled) setIsLoadingMunicipiosTitular(false);
      }
    };

    fetchMunicipiosTitular();
    return () => {
      cancelled = true;
    };
  }, [API_BASE, formData?.departamento]);

  useEffect(() => {
    let cancelled = false;

    const fetchMunicipiosAlterno = async () => {
      setMunicipiosAlterno([]);
      if (!formData?.usarOtroNombre) return;
      const dep = (formData?.altDepartamento || "").trim();
      if (!dep) return;

      setIsLoadingMunicipiosAlterno(true);
      try {
        const url = `${API_BASE}/catalogos/municipios?departamento=${encodeURIComponent(
          dep
        )}`;
        const res = await fetch(url, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        const list = Array.isArray(raw)
          ? raw
              .map((x) => (typeof x === "string" ? x : x?.nombre))
              .filter((s) => typeof s === "string")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];
        if (!cancelled) setMunicipiosAlterno(list);
      } catch (err) {
        console.error("Error cargando municipios (alterno):", err);
        if (!cancelled) setMunicipiosAlterno([]);
      } finally {
        if (!cancelled) setIsLoadingMunicipiosAlterno(false);
      }
    };

    fetchMunicipiosAlterno();
    return () => {
      cancelled = true;
    };
  }, [API_BASE, formData?.usarOtroNombre, formData?.altDepartamento]);

  async function enviarCotizacionPorCorreo() {
    try {
      // Validar que hay usuario y email en sesión
      if (!user || !user.email) {
        throw new Error("No hay sesión activa o falta el email del usuario.");
      }

      // Cliente: solo datos de la sesión
      const cliente = {
        "Primer Nombre": user?.primer_nombre ?? "",
        "Segundo Nombre": user?.segundo_nombre ?? "",
        "Primer Apellido": user?.primer_apellido ?? "",
        "Segundo Apellido": user?.segundo_apellido ?? "",
        Email: user?.email ?? "",
      };

      // Cálculo desde el estado del Paso 2 (no tocamos forms de cliente)
      const calculo =
        itemsCobertura.length > 0
          ? {
              items: itemsCobertura,
              prima_total_con_exceso: totalPaso2,
              tipoCobertura: formData.tipoCobertura,
              excesoRC: Number(formData.excesoRC || 0),
            }
          : null;

      const payload = {
        to: [
          user.email,
          "s.arriaza95@gmail.com",
          "gcarrion@trustcorreduria.com",
        ].filter(Boolean),
        subject: `Cotización Auto - ${formData.marca} ${formData.modelo} ${formData.año}`,
        datosVehiculo: {
          marca: formData.marca,
          modelo: formData.modelo,
          anio: formData.año,
        },
        cliente,
        calculo,
        attachPdf: true,
      };

      const res = await fetch(`${API_BASE}/cotizaciones/enviar-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return true;
    } catch (e) {
      console.error("Error enviando correo:", e);
      return false;
    }
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Aprobada":
        return "bg-green-100 text-green-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "En Revisión":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // -------- Validación por paso --------
  function validateEmail(email: string) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateStep(step: number, data: typeof formData) {
    const e: Record<string, string> = {};

    if (step === 1) {
      if (!data.marca) e.marca = "La marca es requerida.";
      if (!data.modelo) e.modelo = "El modelo es requerido.";
      if (!data.año) e.año = "El año es requerido.";
    }

    if (step === 2) {
      if (data.tipoCobertura === "exceso" && data.excesoRC === "") {
        e.excesoRC = "Seleccione un monto de exceso.";
      }
    }

    if (step === 3) {
      // Titular
      if (!data.primerNombre) e.primerNombre = "Requerido.";
      if (!data.primerApellido) e.primerApellido = "Requerido.";
      if (!data.telefono) e.telefono = "Requerido.";
      if (!validateEmail(data.email)) e.email = "Correo inválido.";
      if (!data.identificacion) e.identificacion = "Requerido.";
      if (!data.departamento) e.departamento = "Requerido.";
      if (!data.municipio) e.municipio = "Requerido.";
      if (!data.direccion) e.direccion = "Requerido.";

      // Alterno (si se activa)
      if (data.usarOtroNombre) {
        if (!data.altPrimerNombre) e.altPrimerNombre = "Requerido.";
        if (!data.altPrimerApellido) e.altPrimerApellido = "Requerido.";
        if (!data.altTelefono) e.altTelefono = "Requerido.";
        if (!validateEmail(data.altEmail)) e.altEmail = "Correo inválido.";
        if (!data.altIdentificacion) e.altIdentificacion = "Requerido.";
        if (!data.altDepartamento) e.altDepartamento = "Requerido.";
        if (!data.altMunicipio) e.altMunicipio = "Requerido.";
        if (!data.altDireccion) e.altDireccion = "Requerido.";
      }
    }

    if (step === 4) {
      if (!data.chasis) e.chasis = "Requerido.";
      if (!data.motor) e.motor = "Requerido.";
      if (!data.color) e.color = "Requerido.";
      if (!data.placa) e.placa = "Requerido.";
      if (!data.usoVehiculo) e.usoVehiculo = "Requerido.";
      if (!data.vigencia) e.vigencia = "Requerido.";
      // Reglas condicionales (descomenta si quieres forzar)
      if (!data.circulacionArchivo)
        e.circulacionArchivo = "Adjunte la circulación.";
      if (data.circulacionDueño === "no" && !data.compraventaArchivo)
        e.compraventaArchivo = "Adjunte la carta de compra-venta.";
      if (data.vehiculoDañado === "si" && !data.danoDescripcion?.trim())
        e.danoDescripcion = "Describa el daño.";
      if (data.cesionDerechos === "si" && !data.cesionEntidad)
        e.cesionEntidad = "Seleccione la entidad.";
    }

    return { valid: Object.keys(e).length === 0, errors: e };
  }

  // -------- Navegación --------
  const nextStep = async () => {
    const next = currentStep + 1;

    // 1) Validar paso actual
    const { valid, errors: stepErrors } = validateStep(currentStep, formData);
    setErrors(stepErrors);
    if (!valid) {
      await openSwal(
        {
          title: "Campos requeridos",
          text: "Completa los campos destacados para continuar.",
          icon: "warning",
          confirmButtonText: "Entendido",
        },
        dialogContentRef.current
      );
      return;
    }

    // 2) Interceptar 2 -> 3 (ANTES estaba en 3 -> 4)
    // 2) Interceptar 2 -> 3
    if (currentStep === 2 && next === 3) {
      const res = await openSwal(
        {
          title: "¿Deseas emitir la póliza?",
          text: "Si continúas, ingresarás los datos del cliente para emitir la póliza.",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, emitir póliza",
          cancelButtonText: "No, enviar a agente",
          reverseButtons: true,
        },
        dialogContentRef.current
      );

      if (res.isConfirmed) {
        // ✅ Autocompletar con el usuario del AuthProvider (sin /auth/me)
        if (!isHydratedFromSession && isAuthenticated && user) {
          hydrateStep3FromAuth();
        } else if (!isAuthenticated) {
          await openSwal(
            {
              title: "No has iniciado sesión",
              text: "Completa los datos manualmente o inicia sesión para autocompletar.",
              icon: "info",
              confirmButtonText: "Entendido",
            },
            dialogContentRef.current
          );
        }
        setCurrentStep(3);
      } else {
        enviarCotizacionPorCorreo();
        await openSwal(
          {
            title: "Información enviada",
            text: "Un agente de seguros se pondrá en contacto con la información suministrada.",
            icon: "success",
            confirmButtonText: "Entendido",
          },
          dialogContentRef.current
        );
        // Si quieres, dispara aquí envío de lead/correo.
      }
      return; // 👈 importante
    }

    // 3) Avance normal
    if (currentStep < 5) setCurrentStep(next);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  //metodos para tomar la informacion del usuario a partir de la sesion activa
  // Bandera para no rehidratar dos veces el paso 3
  const [isHydratedFromSession, setIsHydratedFromSession] = useState(false);

  // 3.2 Mapea AuthUser -> estructura de tu Paso 3 (ajusta si tus keys reales difieren)
  const mapAuthUserToStep3 = (u: any) => ({
    primerNombre: u?.primer_nombre ?? u?.firstName ?? "",
    segundoNombre: u?.segundo_nombre ?? u?.middleName ?? "",
    primerApellido: u?.primer_apellido ?? u?.lastName ?? "",
    segundoApellido: u?.segundo_apellido ?? u?.secondLastName ?? "",
    telefono: u?.telefono ?? u?.phone ?? "",
    celular: u?.celular ?? u?.mobile ?? "",
    email: u?.email ?? "",
    identificacion: u?.identificacion ?? u?.documentId ?? "",
    departamento: u?.departamento ?? u?.state ?? "",
    municipio: u?.municipio ?? u?.city ?? "",
    direccion: u?.direccion ?? u?.address ?? "",
  });

  // 3.3 Hidrata tu formData del Paso 3 con lo que haya en user
  const hydrateStep3FromAuth = useCallback(() => {
    if (!user) return;
    setFormData((prev) => {
      const m = mapAuthUserToStep3(user);
      return {
        ...prev,
        primerNombre: m.primerNombre || prev.primerNombre,
        segundoNombre: m.segundoNombre || prev.segundoNombre,
        primerApellido: m.primerApellido || prev.primerApellido,
        segundoApellido: m.segundoApellido || prev.segundoApellido,
        telefono: m.telefono || prev.telefono,
        celular: m.celular || prev.celular,
        email: m.email || prev.email,
        identificacion: m.identificacion || prev.identificacion,
        departamento: m.departamento || prev.departamento,
        municipio: m.municipio || prev.municipio,
        direccion: m.direccion || prev.direccion,
        parentesco: prev.parentesco || "titular",
      };
    });
    setIsHydratedFromSession(true);
  }, [user, setFormData]);

  useEffect(() => {
    if (
      currentStep === 3 &&
      !isHydratedFromSession &&
      isAuthenticated &&
      user
    ) {
      hydrateStep3FromAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isAuthenticated, user]);

  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const handleDownloadPdf = async () => {
    try {
      if (!formData.marca || !formData.modelo || !formData.año) {
        await openSwal(
          {
            title: "Falta información",
            text: "Completa Marca, Modelo y Año.",
            icon: "info",
            confirmButtonText: "Entendido",
          },
          dialogContentRef.current
        );
        return;
      }
      if (itemsCobertura.length === 0) {
        await openSwal(
          {
            title: "Sin coberturas",
            text: "Calcula primero las coberturas del Paso 2.",
            icon: "info",
            confirmButtonText: "Entendido",
          },
          dialogContentRef.current
        );
        return;
      }

      setIsPdfLoading(true);

      const payload = {
        marca: formData.marca,
        modelo: formData.modelo,
        anio: formData.año,
        items: itemsCobertura,
        total: totalPaso2,
        clienteNombre: formData.usarOtroNombre
          ? `${formData.altPrimerNombre} ${formData.altPrimerApellido}`.trim()
          : `${formData.primerNombre} ${formData.primerApellido}`.trim(),
      };

      const resp = await fetch(`${API_BASE}/cotizaciones/auto/pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // OJO: no pongas Accept: "application/pdf" si tu reverse proxy lo toca mal
        body: JSON.stringify(payload),
        cache: "no-store",
        // credentials: "include", // solo si tu endpoint pide cookie de sesión
      });

      // Si falla, intenta leer texto para mostrar error real
      if (!resp.ok) {
        const errText = await resp.text().catch(() => "");
        throw new Error(
          `HTTP ${resp.status} ${resp.statusText} ${
            errText ? `- ${errText}` : ""
          }`
        );
      }

      // Valida content-type para asegurarte que es PDF real
      const ct = resp.headers.get("content-type") || "";
      if (!ct.toLowerCase().startsWith("application/pdf")) {
        // A veces devuelve HTML/JSON de error: muéstralo para depurar
        const maybeText = await resp.text().catch(() => "");
        throw new Error(
          `Respuesta no-PDF (Content-Type: ${ct}). Detalle: ${
            maybeText?.slice(0, 400) || "sin detalle"
          }`
        );
      }

      // Usa arrayBuffer -> Blob para evitar corrupciones en algunos navegadores
      const buf = await resp.arrayBuffer();
      if (!buf || buf.byteLength === 0) {
        throw new Error("El PDF llegó vacío (0 bytes).");
      }

      // 🔎 Diagnóstico: ¿firma %PDF-?
      const header = new TextDecoder().decode(new Uint8Array(buf).slice(0, 5));
      if (!header.startsWith("%PDF-")) {
        // Si llega aquí, recibiste algo que NO es PDF (HTML/JSON/gzip mal negociado)
        const maybeText = new TextDecoder().decode(new Uint8Array(buf));
        throw new Error(
          `Respuesta no es PDF. Encabezado: "${header}". Muestra: ${maybeText.slice(
            0,
            200
          )}`
        );
      }

      const blob = new Blob([buf], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cotizacion-${formData.marca}-${formData.modelo}-${formData.año}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("PDF download error:", err);
      await openSwal(
        {
          title: "No se pudo descargar el PDF",
          text: err?.message || "Intenta de nuevo.",
          icon: "error",
          confirmButtonText: "Cerrar",
        },
        dialogContentRef.current
      );
    } finally {
      setIsPdfLoading(false);
    }
  };

  function toISODateString(d: Date) {
    // YYYY-MM-DD (zona local)
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function parseISODate(s?: string): Date | undefined {
    if (!s) return undefined;
    const parts = s.split("-");
    if (parts.length !== 3) return undefined;
    const [y, m, d] = parts.map(Number);
    const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
    // Validación simple
    return isNaN(dt.getTime()) ? undefined : dt;
  }

  function formatES(d?: Date) {
    return d
      ? d.toLocaleDateString("es-NI", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "";
  }

  useEffect(() => {
    if (currentStep === 4 && !formData.vigencia) {
      setFormData((prev) => ({
        ...prev,
        vigencia: toISODateString(new Date()),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const handleSubmit = () => {
    if (!formData.aceptaTerminos) return;
    console.log("Cotización enviada:", formData);
    setIsModalOpen(false);
    setCurrentStep(1);
    setErrors({});
    setFormData({
      marca: "",
      modelo: "",
      año: "",
      tipoCobertura: "amplia",
      excesoRC: "",
      primerNombre: "",
      segundoNombre: "",
      telefono: "",
      primerApellido: "",
      segundoApellido: "",
      celular: "",
      email: "",
      identificacion: "",
      departamento: "",
      municipio: "",
      direccion: "",
      parentesco: "",
      usarOtroNombre: false,
      altPrimerNombre: "",
      altSegundoNombre: "",
      altTelefono: "",
      altPrimerApellido: "",
      altSegundoApellido: "",
      altCelular: "",
      altEmail: "",
      altIdentificacion: "",
      altDepartamento: "",
      altMunicipio: "",
      altDireccion: "",
      altParentesco: "",
      chasis: "",
      motor: "",
      color: "",
      placa: "",
      usoVehiculo: "",
      vigencia: "",
      circulacionDueño: "si",
      vehiculoDañado: "no",
      cesionDerechos: "no",
      formaPago: "debito",
      aceptaTerminos: false,
      autorizaCorreo: false,
      circulacionArchivo: null,
      cedulaArchivo: null,
      compraventaArchivo: null,
      danoDescripcion: "",
      cesionEntidad: "",
    });
  };

  // Asegúrate de tener esto a nivel de componente (NO dentro de la función):
  // const { user } = useAuth();

  const handleEmitirPoliza = async () => {
    try {
      const { valid } = validateStep(4, formData);
      if (!valid) {
        await openSwal(
          {
            title: "Completa los datos",
            text: "Revisa los campos requeridos antes de emitir.",
            icon: "warning",
            confirmButtonText: "Entendido",
          },
          dialogContentRef.current
        );
        return;
      }

      // Nombre/correo desde Paso 3
      const clienteNombre = formData.usarOtroNombre
        ? [
            formData.altPrimerNombre,
            formData.altSegundoNombre,
            formData.altPrimerApellido,
            formData.altSegundoApellido,
          ]
            .filter(Boolean)
            .join(" ")
            .trim()
        : [
            formData.primerNombre,
            formData.segundoNombre,
            formData.primerApellido,
            formData.segundoApellido,
          ]
            .filter(Boolean)
            .join(" ")
            .trim();

      const clienteEmail = formData.usarOtroNombre
        ? formData.altEmail
        : formData.email;

      // Payload JSON
      const data = {
        // Paso 1
        marca: formData.marca,
        modelo: formData.modelo,
        anio: String(formData.año || ""),

        // Paso 2
        tipoCobertura: formData.tipoCobertura,
        excesoRC: Number(formData.excesoRC || 0),
        items: itemsCobertura,
        totalPaso2,

        // Paso 3
        clienteNombre,
        clienteEmail,

        // Paso 4
        chasis: formData.chasis,
        motor: formData.motor,
        color: formData.color,
        placa: formData.placa,
        usoVehiculo: formData.usoVehiculo,
        vigencia: formData.vigencia, // YYYY-MM-DD

        circulacionDueno: formData.circulacionDueño, // "si" | "no"
        vehiculoDanado: formData.vehiculoDañado, // "si" | "no"
        descripcionDanios: formData.danoDescripcion || "",
        cesionDerechos: formData.cesionDerechos, // "si" | "no"
        entidadCesion: formData.cesionEntidad || "",

        attachPdf: true,
        to: ["s.arriaza95@gmail.com", "gcarrion@trustcorreduria.com", "amorales@trustcorreduria.com"],
      };

      // Multipart
      const fd = new FormData();
      fd.append("data", JSON.stringify(data));

      // ⬇️ SOLO estos nombres (los que Multer espera)
      if (formData.circulacionArchivo instanceof File) {
        fd.append("circulacionFile", formData.circulacionArchivo);
      }
      if (formData.cedulaArchivo instanceof File) {
        fd.append("cedulaFile", formData.cedulaArchivo);
      }
      if (
        formData.circulacionDueño === "no" &&
        formData.compraventaArchivo instanceof File
      ) {
        fd.append("cartaCompraVentaFile", formData.compraventaArchivo);
      }

      const resp = await fetch(`${API_BASE}/cotizaciones/auto/emitir-mail`, {
        method: "POST",
        body: fd, // no pongas Content-Type manual
      });

      if (!resp.ok) {
        const txt = await resp.text().catch(() => "");
        throw new Error(
          `HTTP ${resp.status} ${resp.statusText}${txt ? ` - ${txt}` : ""}`
        );
      }

      await openSwal(
        {
          title: "¡Listo!",
          text: "Se envió el correo de emisión con los adjuntos.",
          icon: "success",
          confirmButtonText: "OK",
        },
        dialogContentRef.current
      );
      setCurrentStep(1);
    } catch (err: any) {
      console.error("emitir error:", err);
      await openSwal(
        {
          title: "No se pudo enviar",
          text: err?.message || "Intenta nuevamente.",
          icon: "error",
          confirmButtonText: "Cerrar",
        },
        dialogContentRef.current
      );
    }
  };

  // Helpers UI error
  const err = (k: string) => errors[k];
  const invalidClass = (k: string) =>
    err(k) ? "border-red-500 focus-visible:ring-red-500" : "";

  const renderStep = () => {
    switch (currentStep) {
      // -------------------- Paso 1 --------------------
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información del Vehículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marca">Marca *</Label>
                <MarcaCombobox
                  value={formData.marca}
                  onChange={(v) => {
                    setFormData({ ...formData, marca: v, modelo: "" }); // <— resetea modelo
                    setErrors({ ...errors, marca: "" });
                  }}
                  options={marcas}
                  disabled={isLoadingMarcas}
                  errorClass={invalidClass("marca")}
                  placeholder={
                    isLoadingMarcas ? "Cargando marcas..." : "Seleccione marca"
                  }
                />
                {err("marca") && (
                  <p className="text-xs text-red-600">{err("marca")}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo *</Label>
                <ModelCombobox
                  value={formData.modelo}
                  onChange={(v) => {
                    setFormData({ ...formData, modelo: v });
                    setErrors({ ...errors, modelo: "" });
                  }}
                  options={modelos}
                  disabled={
                    !formData.marca || isLoadingModelos || modelos.length === 0
                  }
                  errorClass={invalidClass("modelo")}
                  placeholder={
                    !formData.marca
                      ? "Seleccione marca primero"
                      : isLoadingModelos
                      ? "Cargando modelos..."
                      : modelos.length === 0
                      ? "Sin modelos"
                      : "Seleccione modelo"
                  }
                />
                {err("modelo") && (
                  <p className="text-xs text-red-600">{err("modelo")}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="año">Año *</Label>

                <Popover open={openAnio} onOpenChange={setOpenAnio}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className={`${invalidClass(
                        "año"
                      )} w-full justify-between bg-transparent`}
                      disabled={!formData.marca || !formData.modelo}
                      aria-expanded={openAnio}
                    >
                      {formData.año
                        ? formData.año
                        : isLoadingAnios
                        ? "Cargando años…"
                        : !formData.marca || !formData.modelo
                        ? "Seleccione marca y modelo primero"
                        : "Seleccione año"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command shouldFilter={false}>
                      <CommandInput
                        placeholder="Buscar año…"
                        value={queryAnio}
                        onValueChange={setQueryAnio}
                      />
                      <CommandList>
                        <CommandEmpty>Sin resultados</CommandEmpty>
                        <CommandGroup>
                          {(queryAnio
                            ? anios.filter((a) =>
                                a.toString().includes(queryAnio)
                              )
                            : anios
                          ).map((anio) => (
                            <CommandItem
                              key={anio}
                              value={anio.toString()}
                              onSelect={() => {
                                setFormData({
                                  ...formData,
                                  año: anio.toString(),
                                });
                                setErrors({ ...errors, año: "" });
                                setOpenAnio(false);
                              }}
                            >
                              {anio}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {err("año") && (
                  <p className="text-xs text-red-600">{err("año")}</p>
                )}
              </div>
            </div>
          </div>
        );

      // -------------------- Paso 2 --------------------
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Detalle de Coberturas</h3>

            <div className="space-y-4">
              <RadioGroup
                value={formData.tipoCobertura}
                onValueChange={(value) => {
                  setFormData({ ...formData, tipoCobertura: value });
                  setErrors({ ...errors, excesoRC: "" });
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amplia" id="amplia" />
                  <Label htmlFor="amplia">
                    Cobertura amplia daños propios + R.Civil y Otras
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exceso" id="exceso" />
                  <Label htmlFor="exceso">
                    Cotizar exceso de responsabilidad civil obligatoria
                  </Label>
                </div>
              </RadioGroup>

              {formData.tipoCobertura === "exceso" && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="excesoRC">Monto del exceso *</Label>
                  <Select
                    value={formData.excesoRC}
                    onValueChange={(value) => {
                      setFormData({ ...formData, excesoRC: value });
                      setErrors({ ...errors, excesoRC: "" });
                    }}
                  >
                    <SelectTrigger
                      className={`w-48 ${invalidClass("excesoRC")}`}
                    >
                      <SelectValue placeholder="Seleccione monto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">$0</SelectItem>
                      <SelectItem value="2500">$2,500</SelectItem>
                      <SelectItem value="5000">$5,000</SelectItem>
                      <SelectItem value="7500">$7,500</SelectItem>
                    </SelectContent>
                  </Select>
                  {err("excesoRC") && (
                    <p className="text-xs text-red-600">{err("excesoRC")}</p>
                  )}
                </div>
              )}
            </div>

            {/* Botón descargar PDF */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleDownloadPdf}
                disabled={
                  isLoadingCalc ||
                  !formData.marca ||
                  !formData.modelo ||
                  !formData.año ||
                  itemsCobertura.length === 0 ||
                  isPdfLoading
                }
                className="bg-transparent"
              >
                {isPdfLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generando PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </>
                )}
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium">
                      Detalle de Coberturas
                    </th>
                    <th className="text-right p-3 font-medium">
                      Suma Asegurada
                    </th>
                    <th className="text-right p-3 font-medium">Deducible</th>
                    <th className="text-right p-3 font-medium">Prima</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingCalc ? (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-gray-500">
                        Calculando…
                      </td>
                    </tr>
                  ) : itemsCobertura.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-gray-500">
                        Selecciona Marca, Modelo y Año para ver el desglose.
                      </td>
                    </tr>
                  ) : (
                    itemsCobertura.map((it, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-3">{it.nombre}</td>
                        <td className="p-3 text-right">
                          {it.sumaAseguradaLabel ??
                            (it.sumaAsegurada != null
                              ? it.sumaAsegurada.toLocaleString("es-NI", {
                                  style: "currency",
                                  currency: "USD",
                                })
                              : "—")}
                        </td>
                        <td className="p-3 text-right">{it.deducible || ""}</td>
                        <td className="p-3 text-right">
                          {it.prima.toLocaleString("es-NI", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                  <tr className="border-t bg-gray-50 font-semibold">
                    <td className="p-3">Total a Pagar:</td>
                    <td className="p-3 text-right">US</td>
                    <td className="p-3 text-right"></td>
                    <td className="p-3 text-right">
                      {totalPaso2.toLocaleString("es-NI", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      // -------------------- Paso 3 --------------------
      case 3:
        return (
          <div className="space-y-4">
            <div className="bg-blue-600 text-white p-3 rounded-t-lg">
              <h3 className="text-lg font-semibold">
                Datos del Cliente (Titular)
              </h3>
            </div>
            <div className="space-y-4 p-4 border border-t-0 rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primerNombre">Primer Nombre *</Label>
                  <Input
                    id="primerNombre"
                    value={formData.primerNombre}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        primerNombre: e.target.value,
                      });
                      setErrors({ ...errors, primerNombre: "" });
                    }}
                    placeholder="Primer nombre"
                    className={invalidClass("primerNombre")}
                    aria-invalid={!!err("primerNombre")}
                  />
                  {err("primerNombre") && (
                    <p className="text-xs text-red-600">
                      {err("primerNombre")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                  <Input
                    id="segundoNombre"
                    value={formData.segundoNombre}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        segundoNombre: e.target.value,
                      })
                    }
                    placeholder="Segundo nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => {
                      setFormData({ ...formData, telefono: e.target.value });
                      setErrors({ ...errors, telefono: "" });
                    }}
                    placeholder="Teléfono"
                    className={invalidClass("telefono")}
                    aria-invalid={!!err("telefono")}
                  />
                  {err("telefono") && (
                    <p className="text-xs text-red-600">{err("telefono")}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primerApellido">Primer Apellido *</Label>
                  <Input
                    id="primerApellido"
                    value={formData.primerApellido}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        primerApellido: e.target.value,
                      });
                      setErrors({ ...errors, primerApellido: "" });
                    }}
                    placeholder="Primer apellido"
                    className={invalidClass("primerApellido")}
                    aria-invalid={!!err("primerApellido")}
                  />
                  {err("primerApellido") && (
                    <p className="text-xs text-red-600">
                      {err("primerApellido")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                  <Input
                    id="segundoApellido"
                    value={formData.segundoApellido}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        segundoApellido: e.target.value,
                      })
                    }
                    placeholder="Segundo apellido"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="celular">Celular</Label>
                  <Input
                    id="celular"
                    value={formData.celular}
                    onChange={(e) =>
                      setFormData({ ...formData, celular: e.target.value })
                    }
                    placeholder="Celular"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                    placeholder="correo@ejemplo.com"
                    className={invalidClass("email")}
                    aria-invalid={!!err("email")}
                  />
                  {err("email") && (
                    <p className="text-xs text-red-600">{err("email")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="identificacion">Identificación *</Label>
                  <Input
                    id="identificacion"
                    value={formData.identificacion}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        identificacion: e.target.value,
                      });
                      setErrors({ ...errors, identificacion: "" });
                    }}
                    placeholder="Número de identificación"
                    className={invalidClass("identificacion")}
                    aria-invalid={!!err("identificacion")}
                  />
                  {err("identificacion") && (
                    <p className="text-xs text-red-600">
                      {err("identificacion")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento *</Label>
                  <Select
                    value={formData.departamento || ""} // <- asegura string controlado
                    onValueChange={(nombre) => {
                      const v = (nombre || "").trim(); // 🔧 normaliza
                      setFormData({
                        ...formData,
                        departamento: v,
                        municipio: "", // limpia municipio al cambiar dep
                      });
                      setErrors({ ...errors, departamento: "" });
                    }}
                  >
                    <SelectTrigger className={invalidClass("departamento")}>
                      <SelectValue
                        placeholder={
                          isLoadingDepartamentos
                            ? "Cargando..."
                            : "Seleccione departamento"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.length === 0 && !isLoadingDepartamentos ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          Sin departamentos
                        </div>
                      ) : (
                        departamentos.map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {err("departamento") && (
                    <p className="text-xs text-red-600">
                      {err("departamento")}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="municipio">Municipio *</Label>
                  <Select
                    value={formData.municipio}
                    onValueChange={(nombre) => {
                      setFormData({ ...formData, municipio: nombre });
                      setErrors({ ...errors, municipio: "" });
                    }}
                    disabled={
                      !formData.departamento || isLoadingMunicipiosTitular
                    }
                  >
                    <SelectTrigger className={invalidClass("municipio")}>
                      <SelectValue
                        placeholder={
                          !formData.departamento
                            ? "Seleccione departamento primero"
                            : isLoadingMunicipiosTitular
                            ? "Cargando municipios…"
                            : municipiosTitular.length
                            ? "Seleccione municipio"
                            : "Sin municipios"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {municipiosTitular.map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {err("municipio") && (
                    <p className="text-xs text-red-600">{err("municipio")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección *</Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => {
                      setFormData({ ...formData, direccion: e.target.value });
                      setErrors({ ...errors, direccion: "" });
                    }}
                    placeholder="Dirección completa"
                    className={invalidClass("direccion")}
                    aria-invalid={!!err("direccion")}
                  />
                  {err("direccion") && (
                    <p className="text-xs text-red-600">{err("direccion")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentesco">Parentesco</Label>
                  <Select
                    value={formData.parentesco}
                    onValueChange={(value) =>
                      setFormData({ ...formData, parentesco: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione parentesco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="titular">Titular</SelectItem>
                      <SelectItem value="conyuge">Cónyuge</SelectItem>
                      <SelectItem value="hijo">Hijo/a</SelectItem>
                      <SelectItem value="padre">Padre/Madre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Toggle: Cotizar con otro nombre */}
              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usarOtroNombre"
                    checked={formData.usarOtroNombre}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        usarOtroNombre: Boolean(checked),
                      })
                    }
                  />
                  <Label htmlFor="usarOtroNombre" className="text-sm">
                    Cotizar con otro nombre
                  </Label>
                </div>
              </div>
            </div>

            {/* Bloque alterno */}
            {formData.usarOtroNombre && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="bg-blue-600 text-white p-3 rounded-t-lg -mt-4 -mx-4 mb-4">
                  <h3 className="text-lg font-semibold">
                    Datos de quien se cotiza (Alterno)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="altPrimerNombre">Primer Nombre *</Label>
                    <Input
                      id="altPrimerNombre"
                      value={formData.altPrimerNombre}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          altPrimerNombre: e.target.value,
                        });
                        setErrors({ ...errors, altPrimerNombre: "" });
                      }}
                      placeholder="Primer nombre"
                      className={invalidClass("altPrimerNombre")}
                      aria-invalid={!!err("altPrimerNombre")}
                    />
                    {err("altPrimerNombre") && (
                      <p className="text-xs text-red-600">
                        {err("altPrimerNombre")}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altSegundoNombre">Segundo Nombre</Label>
                    <Input
                      id="altSegundoNombre"
                      value={formData.altSegundoNombre}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          altSegundoNombre: e.target.value,
                        })
                      }
                      placeholder="Segundo nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altTelefono">Teléfono *</Label>
                    <Input
                      id="altTelefono"
                      value={formData.altTelefono}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          altTelefono: e.target.value,
                        });
                        setErrors({ ...errors, altTelefono: "" });
                      }}
                      placeholder="Teléfono"
                      className={invalidClass("altTelefono")}
                      aria-invalid={!!err("altTelefono")}
                    />
                    {err("altTelefono") && (
                      <p className="text-xs text-red-600">
                        {err("altTelefono")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="altPrimerApellido">Primer Apellido *</Label>
                    <Input
                      id="altPrimerApellido"
                      value={formData.altPrimerApellido}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          altPrimerApellido: e.target.value,
                        });
                        setErrors({ ...errors, altPrimerApellido: "" });
                      }}
                      placeholder="Primer apellido"
                      className={invalidClass("altPrimerApellido")}
                      aria-invalid={!!err("altPrimerApellido")}
                    />
                    {err("altPrimerApellido") && (
                      <p className="text-xs text-red-600">
                        {err("altPrimerApellido")}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altSegundoApellido">Segundo Apellido</Label>
                    <Input
                      id="altSegundoApellido"
                      value={formData.altSegundoApellido}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          altSegundoApellido: e.target.value,
                        })
                      }
                      placeholder="Segundo apellido"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altCelular">Celular</Label>
                    <Input
                      id="altCelular"
                      value={formData.altCelular}
                      onChange={(e) =>
                        setFormData({ ...formData, altCelular: e.target.value })
                      }
                      placeholder="Celular"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="altEmail">Email *</Label>
                    <Input
                      id="altEmail"
                      type="email"
                      value={formData.altEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, altEmail: e.target.value });
                        setErrors({ ...errors, altEmail: "" });
                      }}
                      placeholder="correo@ejemplo.com"
                      className={invalidClass("altEmail")}
                      aria-invalid={!!err("altEmail")}
                    />
                    {err("altEmail") && (
                      <p className="text-xs text-red-600">{err("altEmail")}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altIdentificacion">Identificación *</Label>
                    <Input
                      id="altIdentificacion"
                      value={formData.altIdentificacion}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          altIdentificacion: e.target.value,
                        });
                        setErrors({ ...errors, altIdentificacion: "" });
                      }}
                      placeholder="Número de identificación"
                      className={invalidClass("altIdentificacion")}
                      aria-invalid={!!err("altIdentificacion")}
                    />
                    {err("altIdentificacion") && (
                      <p className="text-xs text-red-600">
                        {err("altIdentificacion")}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altDepartamento">Departamento *</Label>
                    <Select
                      value={formData.altDepartamento}
                      onValueChange={(nombre) => {
                        setFormData({
                          ...formData,
                          altDepartamento: nombre,
                          altMunicipio: "",
                        });
                        setErrors({ ...errors, altDepartamento: "" });
                      }}
                    >
                      <SelectTrigger
                        className={invalidClass("altDepartamento")}
                      >
                        <SelectValue
                          placeholder={
                            isLoadingDepartamentos
                              ? "Cargando..."
                              : "Seleccione departamento"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {departamentos.length === 0 &&
                        !isLoadingDepartamentos ? (
                          <div className="px-3 py-2 text-sm text-muted-foreground">
                            Sin departamentos
                          </div>
                        ) : (
                          departamentos.map((n) => (
                            <SelectItem key={n} value={n}>
                              {n}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    {err("altDepartamento") && (
                      <p className="text-xs text-red-600">
                        {err("altDepartamento")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="altMunicipio">Municipio *</Label>
                    <Select
                      value={formData.altMunicipio}
                      onValueChange={(nombre) => {
                        setFormData({ ...formData, altMunicipio: nombre });
                        setErrors({ ...errors, altMunicipio: "" });
                      }}
                      disabled={
                        !formData.altDepartamento || isLoadingMunicipiosAlterno
                      }
                    >
                      <SelectTrigger className={invalidClass("altMunicipio")}>
                        <SelectValue
                          placeholder={
                            !formData.altDepartamento
                              ? "Seleccione departamento primero"
                              : isLoadingMunicipiosAlterno
                              ? "Cargando municipios…"
                              : municipiosAlterno.length
                              ? "Seleccione municipio"
                              : "Sin municipios"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {municipiosAlterno.map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {err("altMunicipio") && (
                      <p className="text-xs text-red-600">
                        {err("altMunicipio")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="altDireccion">Dirección *</Label>
                    <Input
                      id="altDireccion"
                      value={formData.altDireccion}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          altDireccion: e.target.value,
                        });
                        setErrors({ ...errors, altDireccion: "" });
                      }}
                      placeholder="Dirección completa"
                      className={invalidClass("altDireccion")}
                      aria-invalid={!!err("altDireccion")}
                    />
                    {err("altDireccion") && (
                      <p className="text-xs text-red-600">
                        {err("altDireccion")}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altParentesco">Parentesco</Label>
                    <Select
                      value={formData.altParentesco}
                      onValueChange={(value) =>
                        setFormData({ ...formData, altParentesco: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione parentesco" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="titular">Titular</SelectItem>
                        <SelectItem value="conyuge">Cónyuge</SelectItem>
                        <SelectItem value="hijo">Hijo/a</SelectItem>
                        <SelectItem value="padre">Padre/Madre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      // -------------------- Paso 4 --------------------
      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-blue-600 text-white p-3 rounded-t-lg">
              <h3 className="text-lg font-semibold">Datos del Vehículo:</h3>
            </div>

            <div className="space-y-4 p-4 border border-t-0 rounded-b-lg">
              {/* Marca + Chasis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marca2">Marca</Label>
                  <Input
                    id="marca2"
                    value={formData.marca}
                    onChange={(e) =>
                      setFormData({ ...formData, marca: e.target.value })
                    }
                    placeholder="Ingresa Marca"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chasis">Chasis *</Label>
                  <Input
                    id="chasis"
                    value={formData.chasis}
                    onChange={(e) => {
                      setFormData({ ...formData, chasis: e.target.value });
                      setErrors({ ...errors, chasis: "" });
                    }}
                    placeholder="Ingresa Chasis"
                    className={invalidClass("chasis")}
                    aria-invalid={!!err("chasis")}
                  />
                  {err("chasis") && (
                    <p className="text-xs text-red-600">{err("chasis")}</p>
                  )}
                </div>
              </div>

              {/* Modelo + Motor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modelo2">Modelo</Label>
                  <Input
                    id="modelo2"
                    value={formData.modelo}
                    onChange={(e) =>
                      setFormData({ ...formData, modelo: e.target.value })
                    }
                    placeholder="Ingresa Modelo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motor">Motor *</Label>
                  <Input
                    id="motor"
                    value={formData.motor}
                    onChange={(e) => {
                      setFormData({ ...formData, motor: e.target.value });
                      setErrors({ ...errors, motor: "" });
                    }}
                    placeholder="Ingresa Motor"
                    className={invalidClass("motor")}
                    aria-invalid={!!err("motor")}
                  />
                  {err("motor") && (
                    <p className="text-xs text-red-600">{err("motor")}</p>
                  )}
                </div>
              </div>

              {/* Año + Color */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="año2">Año</Label>
                  <Input
                    id="año2"
                    value={formData.año}
                    onChange={(e) =>
                      setFormData({ ...formData, año: e.target.value })
                    }
                    placeholder="Ingresa Año"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color *</Label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => {
                      setFormData({ ...formData, color: value });
                      setErrors({ ...errors, color: "" });
                    }}
                  >
                    <SelectTrigger className={invalidClass("color")}>
                      <SelectValue placeholder="Selecciona color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blanco">Blanco</SelectItem>
                      <SelectItem value="negro">Negro</SelectItem>
                      <SelectItem value="gris">Gris</SelectItem>
                      <SelectItem value="azul">Azul</SelectItem>
                      <SelectItem value="rojo">Rojo</SelectItem>
                    </SelectContent>
                  </Select>
                  {err("color") && (
                    <p className="text-xs text-red-600">{err("color")}</p>
                  )}
                </div>
              </div>

              {/* Placa + Uso */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="placa">Placa *</Label>
                  <Input
                    id="placa"
                    value={formData.placa}
                    onChange={(e) => {
                      setFormData({ ...formData, placa: e.target.value });
                      setErrors({ ...errors, placa: "" });
                    }}
                    placeholder="Ingresa Placa"
                    className={invalidClass("placa")}
                    aria-invalid={!!err("placa")}
                  />
                  {err("placa") && (
                    <p className="text-xs text-red-600">{err("placa")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usoVehiculo">Uso de Vehículo *</Label>
                  <Select
                    value={formData.usoVehiculo}
                    onValueChange={(value) => {
                      setFormData({ ...formData, usoVehiculo: value });
                      setErrors({ ...errors, usoVehiculo: "" });
                    }}
                  >
                    <SelectTrigger className={invalidClass("usoVehiculo")}>
                      <SelectValue placeholder="Selecciona uso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="particular">Particular</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="publico">Público</SelectItem>
                    </SelectContent>
                  </Select>
                  {err("usoVehiculo") && (
                    <p className="text-xs text-red-600">{err("usoVehiculo")}</p>
                  )}
                </div>
              </div>

              {/* Vigencia + Archivos base (Circulación y Cédula) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vigencia">Vigencia *</Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="vigencia"
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${invalidClass(
                          "vigencia"
                        )}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatES(parseISODate(formData.vigencia)) ||
                          "Selecciona fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={parseISODate(formData.vigencia) || new Date()}
                        onSelect={(date) => {
                          if (!date) return;
                          setFormData({
                            ...formData,
                            vigencia: toISODateString(date),
                          });
                          setErrors({ ...errors, vigencia: "" });
                        }}
                        // Opcional: limitar fechas (ejemplo: desde hoy en adelante)
                        // disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {err("vigencia") && (
                    <p className="text-xs text-red-600">{err("vigencia")}</p>
                  )}
                </div>

                {/* Archivo Circulación */}
                <div className="space-y-2">
                  <Label htmlFor="circulacionArchivo">
                    Archivo Circulación
                  </Label>
                  <Input
                    id="circulacionArchivo"
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        circulacionArchivo: e.target.files?.[0] ?? null,
                      })
                    }
                  />
                  {formData.circulacionArchivo && (
                    <p className="text-xs text-muted-foreground">
                      {formData.circulacionArchivo.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Cédula del cliente (archivo) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cedulaArchivo">Cédula del Cliente</Label>
                  <Input
                    id="cedulaArchivo"
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cedulaArchivo: e.target.files?.[0] ?? null,
                      })
                    }
                  />
                  {formData.cedulaArchivo && (
                    <p className="text-xs text-muted-foreground">
                      {formData.cedulaArchivo.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Preguntas sí/no con condicionales */}
              <div className="space-y-4">
                {/* Circulación a nombre del dueño */}
                <div className="space-y-2">
                  <Label>¿La circulación está a nombre del dueño actual?</Label>
                  <RadioGroup
                    value={formData.circulacionDueño}
                    onValueChange={(value) => {
                      setFormData({
                        ...formData,
                        circulacionDueño: value,
                        // si cambia a "sí", limpia carta de compra-venta
                        compraventaArchivo:
                          value === "si" ? null : formData.compraventaArchivo,
                      });
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="circulacion-si" />
                      <Label htmlFor="circulacion-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="circulacion-no" />
                      <Label htmlFor="circulacion-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Si circulación = NO -> subir carta de compra-venta */}
                {formData.circulacionDueño === "no" && (
                  <div className="space-y-2">
                    <Label htmlFor="compraventaArchivo">
                      Carta de Compra-Venta
                    </Label>
                    <Input
                      id="compraventaArchivo"
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          compraventaArchivo: e.target.files?.[0] ?? null,
                        })
                      }
                    />
                    {formData.compraventaArchivo && (
                      <p className="text-xs text-muted-foreground">
                        {formData.compraventaArchivo.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Vehículo con daños */}
                <div className="space-y-2">
                  <Label>¿El vehículo presenta algún daño actualmente?</Label>
                  <RadioGroup
                    value={formData.vehiculoDañado}
                    onValueChange={(value) => {
                      setFormData({
                        ...formData,
                        vehiculoDañado: value,
                        danoDescripcion:
                          value === "si" ? formData.danoDescripcion : "",
                      });
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="daño-si" />
                      <Label htmlFor="daño-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="daño-no" />
                      <Label htmlFor="daño-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Si daños = SI -> descripción */}
                {formData.vehiculoDañado === "si" && (
                  <div className="space-y-2">
                    <Label htmlFor="danoDescripcion">Describa el daño</Label>
                    <Textarea
                      id="danoDescripcion"
                      placeholder="Ej.: Golpe leve en puerta derecha, rayón en parachoques, etc."
                      value={formData.danoDescripcion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          danoDescripcion: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>

              {/* Cesionario */}
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <h4 className="font-semibold">Cesionario:</h4>
              </div>

              <div className="space-y-2">
                <Label>¿Existe cesión de derechos de la póliza?</Label>
                <RadioGroup
                  value={formData.cesionDerechos}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      cesionDerechos: value,
                      cesionEntidad:
                        value === "si" ? formData.cesionEntidad : "",
                    });
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="cesion-si" />
                    <Label htmlFor="cesion-si">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cesion-no" />
                    <Label htmlFor="cesion-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Si cesión = SI -> Select de entidad */}
              {formData.cesionDerechos === "si" && (
                <div className="space-y-2">
                  <Label htmlFor="cesionEntidad">Entidad</Label>
                  <Select
                    value={formData.cesionEntidad}
                    onValueChange={(value) =>
                      setFormData({ ...formData, cesionEntidad: value })
                    }
                  >
                    <SelectTrigger id="cesionEntidad">
                      <SelectValue placeholder="Seleccione entidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Banco de la Produción (BANPRO)">
                        Banco de la Produción (BANPRO)
                      </SelectItem>
                      <SelectItem value="AUTO NICA, S.A.">
                        AUTO NICA, S.A.
                      </SelectItem>
                      <SelectItem value="Banco de America Central (BAC)">
                        Banco de America Central (BAC)
                      </SelectItem>
                      <SelectItem value="Banco de Finanzas (BDF)">
                        Banco de Finanzas (BDF)
                      </SelectItem>
                      <SelectItem value="Inversiones Automotrices, S.A. (INVERAUTO)">
                        Inversiones Automotrices, S.A. (INVERAUTO)
                      </SelectItem>
                      <SelectItem value="Auto Excel de Nicaragua, S.A.">
                        Auto Excel de Nicaragua, S.A.
                      </SelectItem>
                      <SelectItem value="BANCO AVANZ">BANCO AVANZ</SelectItem>
                      <SelectItem value="Fondo de Desarrollo Local (FDL)">
                        Fondo de Desarrollo Local (FDL)
                      </SelectItem>
                      <SelectItem value="Julio Martinez Repuestos Sociedad Anónima">
                        Julio Martinez Repuestos Sociedad Anónima
                      </SelectItem>
                      <SelectItem value="ASSA">ASSA</SelectItem>
                      <SelectItem value="BANCO LAFISE BANCENTRO">
                        BANCO LAFISE BANCENTRO
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Únicamente se podrá asegurar vehículos de uso particular, no
                  se puede asegurar taxis o de ningún tipo de transporte
                  colectivo.
                </p>
              </div>
            </div>
          </div>
        );

      // -------------------- Paso 5 --------------------
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Forma de Pago</h3>

            <RadioGroup
              value={formData.formaPago}
              onValueChange={(value) =>
                setFormData({ ...formData, formaPago: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debito" id="debito" />
                <Label htmlFor="debito">Débito Automático</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deposito" id="deposito" />
                <Label htmlFor="deposito">Depósito Referenciado</Label>
              </div>
            </RadioGroup>

            {formData.formaPago === "debito" && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Débito Automático
                </h4>
                <p className="text-blue-800 text-sm">
                  Nuestro ejecutivo se comunicará con usted para solicitar la
                  información de su tarjeta de débito o crédito para procesar el
                  pago automático de su póliza.
                </p>
              </div>
            )}

            {formData.formaPago === "deposito" && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-center text-sm mb-4">
                    Enviar cheque a ASSA compañía de seguros a realizar pagos
                    directo a caja.
                    <br />
                    Efectuar sus pagos, depositando en las cuentas bancarias de
                    cualquier sucursal de los siguientes bancos:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 p-2 text-center">
                            BANCO
                          </th>
                          <th className="border border-gray-300 p-2 text-center">
                            CUENTA DÓLARES
                          </th>
                          <th className="border border-gray-300 p-2 text-center">
                            CUENTA CÓRDOBAS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2 text-center">
                            Banco de Finanzas
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            203-3018226
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            202-3016497
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-center mt-4">
                    (Si el pago es realizado mediante una de las cuentas aquí
                    detalladas, favor indicar al cajero que detalle en el
                    concepto el Número de Póliza)
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terminos"
                  checked={formData.aceptaTerminos}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      aceptaTerminos: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="terminos" className="text-sm">
                  Doy fe de que toda la información introducida en este
                  formulario es verdadera.
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="correo"
                  checked={formData.autorizaCorreo}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      autorizaCorreo: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="correo" className="text-sm">
                  Autorizo a ASSA enviar por correo electrónico mi póliza,
                  incluyendo renovación y/o adendas que se realicen.
                </Label>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-sm text-yellow-800">
                Únicamente se podrá asegurar vehículos de uso particular, no se
                puede asegurar taxis o de ningún tipo de transporte colectivo
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Car className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Seguros de Automóvil
            </h1>
            <p className="text-gray-600">
              Protege tu vehículo con la mejor cobertura del mercado
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                ¿Por qué elegir nuestro seguro de auto?
              </h2>
              <p className="text-blue-100 mb-6">
                Ofrecemos la protección más completa para tu vehículo con
                coberturas flexibles, asistencia 24/7 y los mejores precios del
                mercado.
              </p>
              <div className="flex space-x-4">
                <Dialog
                  open={isModalOpen}
                  onOpenChange={(o) => {
                    setIsModalOpen(o);
                    if (!o) {
                      setCurrentStep(1);
                      setErrors({});
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Cotizar Ahora
                    </Button>
                  </DialogTrigger>
                  {/* ref para usar como target de Swal */}
                  <DialogContent
                    ref={dialogContentRef}
                    className="max-w-4xl max-h-[90vh] overflow-y-auto"
                  >
                    <DialogHeader>
                      <DialogTitle>
                        Cotización de Seguro de Automóvil - Paso {currentStep}{" "}
                        de 5
                      </DialogTitle>
                      <DialogDescription>
                        Complete todos los pasos para generar su cotización
                        personalizada
                      </DialogDescription>
                    </DialogHeader>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                      ></div>
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[400px]">{renderStep()}</div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Anterior
                      </Button>

                      {currentStep < 5 ? (
                        <Button onClick={nextStep}>
                          Siguiente
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleEmitirPoliza}
                          disabled={!formData.aceptaTerminos}
                        >
                          Enviar Cotización
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Ver Beneficios
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Cotización Express
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Cobertura Básica:</span>
                    <span className="font-semibold">Desde $800/año</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cobertura Amplia:</span>
                    <span className="font-semibold">Desde $1,200/año</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cobertura Total:</span>
                    <span className="font-semibold">Desde $1,800/año</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beneficios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {beneficiosAuto.map((beneficio, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <beneficio.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{beneficio.titulo}</h3>
              <p className="text-gray-600 text-sm">{beneficio.descripcion}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lista de Cotizaciones */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Cotizaciones Recientes</CardTitle>
            <CardDescription>
              Historial de cotizaciones de automóvil
            </CardDescription>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Cotizar Ahora
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cotizacionesAuto.map((cotizacion) => (
              <div
                key={cotizacion.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{cotizacion.cliente}</h4>
                  <p className="text-sm text-gray-600">{cotizacion.vehiculo}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{cotizacion.monto}</p>
                    <p className="text-sm text-gray-500">{cotizacion.fecha}</p>
                  </div>
                  <Badge className={getStatusColor(cotizacion.estado)}>
                    {cotizacion.estado}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
