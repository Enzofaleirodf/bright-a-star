import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import ControlsBar from "../components/ControlsBar";
import Sidebar from "../components/Sidebar";
import VehicleSidebar from "../components/VehicleSidebar";
import StatsBar from "../components/StatsBar";
import AuctionCard from "../components/AuctionCard";
import FloatingFilterButton from "../components/ui/FloatingFilterButton";
import FilterModal from "../components/ui/FilterModal";
import PropertyPagination from "../components/ui/PropertyPagination";
import MobileBottomNavigation from "../components/ui/MobileBottomNavigation";
import { toast } from "../components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PropertyCardData {
  id: string;
  type: string;
  area?: string;
  location: string;
  evaluation: string;
  currentBid: string;
  discount?: string;
  auction: string;
  date: string;
  auctioneer: string;
  isNew?: boolean;
  isVerified?: boolean;
}

interface VehicleCardData {
  id: string;
  marca: string;
  modelo: string;
  year?: string;
  location: string;
  evaluation: string;
  currentBid: string;
  discount?: string;
  auction: string;
  date: string;
  auctioneer: string;
  isNew?: boolean;
  isVerified?: boolean;
}

// Helpers to format data from Supabase
const formatBRL = (v: unknown): string => {
  const n = typeof v === "string" ? parseFloat(v) : typeof v === "number" ? v : NaN;
  if (!isFinite(n)) return "R$ -";
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
};
const computeDiscount = (appraised: unknown, bid: unknown): string | undefined => {
  const a = typeof appraised === "string" ? parseFloat(appraised) : typeof appraised === "number" ? appraised : NaN;
  const b = typeof bid === "string" ? parseFloat(bid) : typeof bid === "number" ? bid : NaN;
  if (isFinite(a) && isFinite(b) && b < a && a > 0) {
    const pct = Math.round((1 - b / a) * 100);
    if (pct > 0) return `-${pct}%`;
  }
  return undefined;
};
const formatLocation = (city?: string | null, state?: string | null) => {
  const c = city?.trim() || "";
  const s = state?.trim() || "";
  return c && s ? `${c}, ${s}` : c || s || "";
};
const formatDateLabel = (endDate?: string | null) => {
  if (!endDate) return "";
  const d = new Date(endDate);
  if (isNaN(d.getTime())) return endDate as string;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  return `${dd}/${mm} ${hh}h`;
};

const properties: PropertyCardData[] = [
  {
    id: "1",
    type: "Terreno",
    area: "200m²",
    location: "Rua Santa Helena, 19 - São Paulo, SP",
    evaluation: "R$24.000",
    currentBid: "R$12.000",
    discount: "-50%",
    auction: "2ª Praça",
    date: "24/08/ 16h",
    auctioneer: "Alfa Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "2",
    type: "Casa",
    area: "120m²",
    location: "Rua das Flores, 456 - São Paulo, SP",
    evaluation: "R$450.000",
    currentBid: "R$520.000",
    auction: "1ª Praça",
    date: "25/08/ 14h",
    auctioneer: "Alfa Leilões",
    isVerified: true
  },
  {
    id: "3",
    type: "Gleba",
    area: "5.000m²",
    location: "Setor de Mansões, Lote 12 - Brasília, DF",
    evaluation: "R$60.000",
    currentBid: "R$45.000",
    discount: "-25%",
    auction: "1ª Praça",
    date: "24/08/ 16h",
    auctioneer: "Hoppe Leil��es",
    isNew: true,
    isVerified: true
  },
  {
    id: "4",
    type: "Chácara",
    area: "15.000m²",
    location: "Estrada do Tingui, 1250 - Rio de Janeiro, RJ",
    evaluation: "R$340.000",
    currentBid: "R$340.000",
    auction: "2ª Praça",
    date: "24/08/ 16h",
    auctioneer: "Alfa Leilões",
    isVerified: true
  },
  {
    id: "5",
    type: "Sítio",
    area: "8.500m²",
    location: "Rua das Acácias, 456 - Rio de Janeiro, RJ",
    evaluation: "R$340.000",
    currentBid: "R$340.000",
    auction: "2ª Praça",
    date: "24/08/ 16h",
    auctioneer: "Alfa Leilões",
    isVerified: true
  },
  {
    id: "6",
    type: "Lote",
    area: "450m²",
    location: "Avenida Marechal Floriano, 823 - Curitiba, PR",
    evaluation: "R$160.000",
    currentBid: "R$160.000",
    discount: "-15%",
    auction: "2ª Praça",
    date: "24/08/ 16h",
    auctioneer: "Alfa Leilões",
    isVerified: true
  },
  {
    id: "7",
    type: "Cobertura",
    area: "180m²",
    location: "Av. Atl��ntica, 2500 - Rio de Janeiro, RJ",
    evaluation: "R$2.500.000",
    currentBid: "R$2.750.000",
    auction: "Praça única",
    date: "30/08/ 16h",
    auctioneer: "Elite Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "8",
    type: "Galpão",
    area: "800m²",
    location: "Distrito Industrial - São Paulo, SP",
    evaluation: "R$650.000",
    currentBid: "R$455.000",
    discount: "-30%",
    auction: "2ª Praça",
    date: "31/08/ 10h",
    auctioneer: "Industrial Leilões",
    isVerified: true
  },
  {
    id: "9",
    type: "Sala Comercial",
    area: "65m²",
    location: "Centro Empresarial - Brasília, DF",
    evaluation: "R$380.000",
    currentBid: "R$380.000",
    auction: "3ª Praça",
    date: "01/09/ 14h",
    auctioneer: "Comercial Leilões",
    isVerified: true
  },
  {
    id: "10",
    type: "Sobrado",
    area: "220m²",
    location: "Vila Madalena - São Paulo, SP",
    evaluation: "R$890.000",
    currentBid: "R$623.000",
    discount: "-30%",
    auction: "1ª Praça",
    date: "02/09/ 15h",
    auctioneer: "Residencial Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "11",
    type: "Prédio Comercial",
    area: "1.200m²",
    location: "Centro Histórico - Salvador, BA",
    evaluation: "R$3.800.000",
    currentBid: "R$4.180.000",
    auction: "Praça única",
    date: "03/09/ 11h",
    auctioneer: "Patrimônio Leilões",
    isVerified: true
  },
  {
    id: "12",
    type: "Chalet",
    area: "95m²",
    location: "Campos do Jordão - São Paulo, SP",
    evaluation: "R$520.000",
    currentBid: "R$364.000",
    discount: "-30%",
    auction: "2ª Praça",
    date: "04/09/ 16h",
    auctioneer: "Montanha Leilões",
    isVerified: true
  },
  {
    id: "13",
    type: "Pousada",
    area: "450m²",
    location: "Centro Histórico - Ouro Preto, MG",
    evaluation: "R$1.100.000",
    currentBid: "R$1.100.000",
    auction: "3ª Praça",
    date: "05/09/ 13h",
    auctioneer: "Turismo Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "14",
    type: "Mansão",
    area: "650m²",
    location: "Alphaville - São Paulo, SP",
    evaluation: "R$4.200.000",
    currentBid: "R$4.620.000",
    auction: "1ª Praça",
    date: "06/09/ 10h",
    auctioneer: "Luxury Imóveis",
    isVerified: true
  },
  {
    id: "15",
    type: "Kitnet",
    area: "25m²",
    location: "Vila Olímpia - São Paulo, SP",
    evaluation: "R$180.000",
    currentBid: "R$126.000",
    discount: "-30%",
    auction: "Praça única",
    date: "07/09/ 14h",
    auctioneer: "Compacto Leilões",
    isVerified: true
  },
  {
    id: "16",
    type: "Loft",
    area: "75m²",
    location: "Centro - Curitiba, PR",
    evaluation: "R$320.000",
    currentBid: "R$320.000",
    auction: "2ª Praça",
    date: "08/09/ 15h",
    auctioneer: "Urban Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "17",
    type: "Estacionamento",
    area: "15m²",
    location: "Ipanema - Rio de Janeiro, RJ",
    evaluation: "R$85.000",
    currentBid: "R$93.500",
    auction: "3ª Praça",
    date: "09/09/ 11h",
    auctioneer: "Garagem Leilões",
    isVerified: true
  },
  {
    id: "18",
    type: "Duplex",
    area: "140m²",
    location: "Barra da Tijuca - Rio de Janeiro, RJ",
    evaluation: "R$750.000",
    currentBid: "R$525.000",
    discount: "-30%",
    auction: "1ª Praça",
    date: "10/09/ 16h",
    auctioneer: "Oceano Leilões",
    isVerified: true
  },
  {
    id: "19",
    type: "Resort",
    area: "2.500m²",
    location: "Costa do Sauípe - Bahia, BA",
    evaluation: "R$8.500.000",
    currentBid: "R$8.500.000",
    auction: "Praça única",
    date: "11/09/ 12h",
    auctioneer: "Resort Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "20",
    type: "Fazenda de Café",
    area: "80.000m²",
    location: "Sul de Minas - Minas Gerais, MG",
    evaluation: "R$2.200.000",
    currentBid: "R$2.420.000",
    auction: "2ª Praça",
    date: "12/09/ 13h",
    auctioneer: "Café Leilões",
    isVerified: true
  },
  {
    id: "21",
    type: "Flat",
    area: "45m²",
    location: "Boa Viagem - Recife, PE",
    evaluation: "R$280.000",
    currentBid: "R$196.000",
    discount: "-30%",
    auction: "3ª Praça",
    date: "13/09/ 14h",
    auctioneer: "Nordeste Leilões",
    isVerified: true
  },
  {
    id: "22",
    type: "Condomínio",
    area: "5.200m²",
    location: "Gramado - Rio Grande do Sul, RS",
    evaluation: "R$6.800.000",
    currentBid: "R$6.800.000",
    auction: "1ª Praça",
    date: "14/09/ 15h",
    auctioneer: "Serra Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "23",
    type: "Haras",
    area: "120.000m²",
    location: "Interior de São Paulo - São Paulo, SP",
    evaluation: "R$3.500.000",
    currentBid: "R$3.850.000",
    auction: "Praça única",
    date: "15/09/ 10h",
    auctioneer: "Equestre Leilões",
    isVerified: true
  },
  {
    id: "24",
    type: "Penthouse",
    area: "300m²",
    location: "Leblon - Rio de Janeiro, RJ",
    evaluation: "R$5.200.000",
    currentBid: "R$3.640.000",
    discount: "-30%",
    auction: "2ª Praça",
    date: "16/09/ 16h",
    auctioneer: "Premium Leilões",
    isVerified: true
  },
  {
    id: "25",
    type: "Silo",
    area: "1.800m²",
    location: "Zona Rural - Goiás, GO",
    evaluation: "R$950.000",
    currentBid: "R$950.000",
    auction: "3ª Praça",
    date: "17/09/ 11h",
    auctioneer: "Agro Leilões",
    isVerified: true
  },
  {
    id: "26",
    type: "Shopping Center",
    area: "8.500m²",
    location: "Centro - Fortaleza, CE",
    evaluation: "R$12.000.000",
    currentBid: "R$13.200.000",
    auction: "1ª Praça",
    date: "18/09/ 12h",
    auctioneer: "Mall Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "27",
    type: "Bangalô",
    area: "110m²",
    location: "Trancoso - Bahia, BA",
    evaluation: "R$680.000",
    currentBid: "R$476.000",
    discount: "-30%",
    auction: "Praça única",
    date: "19/09/ 13h",
    auctioneer: "Praia Leilões",
    isVerified: true
  },
  {
    id: "28",
    type: "Castelo",
    area: "2.800m²",
    location: "Petrópolis - Rio de Janeiro, RJ",
    evaluation: "R$15.000.000",
    currentBid: "R$15.000.000",
    auction: "2ª Praça",
    date: "20/09/ 14h",
    auctioneer: "Imperial Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "29",
    type: "Motel",
    area: "850m²",
    location: "Rodovia BR-101 - São Paulo, SP",
    evaluation: "R$1.400.000",
    currentBid: "R$1.540.000",
    auction: "3ª Praça",
    date: "21/09/ 15h",
    auctioneer: "Rodoviário Leilões",
    isVerified: true
  },
  {
    id: "30",
    type: "Marina",
    area: "3.200m²",
    location: "Angra dos Reis - Rio de Janeiro, RJ",
    evaluation: "R$8.800.000",
    currentBid: "R$6.160.000",
    discount: "-30%",
    auction: "1ª Praça",
    date: "22/09/ 16h",
    auctioneer: "Náutico Leilões",
    isVerified: true
  },
  {
    id: "31",
    type: "Fábrica",
    area: "4.500m²",
    location: "ABC Paulista - São Paulo, SP",
    evaluation: "R$7.200.000",
    currentBid: "R$7.200.000",
    auction: "Praça única",
    date: "23/09/ 10h",
    auctioneer: "Industrial Pro",
    isNew: true,
    isVerified: true
  },
  {
    id: "32",
    type: "Observatório",
    area: "450m²",
    location: "Serra da Mantiqueira - Minas Gerais, MG",
    evaluation: "R$1.800.000",
    currentBid: "R$1.980.000",
    auction: "2ª Praça",
    date: "24/09/ 11h",
    auctioneer: "Astro Leilões",
    isVerified: true
  },
  {
    id: "33",
    type: "Vineyard",
    area: "25.000m²",
    location: "Vale dos Vinhedos - Rio Grande do Sul, RS",
    evaluation: "R$3.800.000",
    currentBid: "R$2.660.000",
    discount: "-30%",
    auction: "3ª Praça",
    date: "25/09/ 12h",
    auctioneer: "Vinho Leilões",
    isVerified: true
  }
];

const vehicles: VehicleCardData[] = [
  {
    id: "1",
    marca: "Honda",
    modelo: "Civic",
    year: "2020",
    location: "São Paulo, SP",
    evaluation: "R$85.000",
    currentBid: "R$42.500",
    discount: "-50%",
    auction: "2ª Praça",
    date: "24/08/ 16h",
    auctioneer: "Auto Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "2",
    marca: "BMW",
    modelo: "X3",
    year: "2021",
    location: "São Paulo, SP",
    evaluation: "R$180.000",
    currentBid: "R$195.000",
    auction: "1ª Praça",
    date: "25/08/ 14h",
    auctioneer: "Premium Leilões",
    isVerified: true
  },
  {
    id: "3",
    marca: "Volkswagen",
    modelo: "Golf",
    year: "2018",
    location: "Brasília, DF",
    evaluation: "R$65.000",
    currentBid: "R$48.750",
    discount: "-25%",
    auction: "2ª Praça",
    date: "24/08/ 16h",
    auctioneer: "Veíc Leilões",
    isVerified: true
  },
  {
    id: "4",
    marca: "Ford",
    modelo: "Focus",
    year: "2017",
    location: "Curitiba, PR",
    evaluation: "R$52.000",
    currentBid: "R$39.000",
    discount: "-25%",
    auction: "1ª Praça",
    date: "24/08/ 16h",
    auctioneer: "Auto Leilões",
    isVerified: true
  },
  {
    id: "5",
    marca: "Chevrolet",
    modelo: "Onix",
    year: "2021",
    location: "Belo Horizonte, MG",
    evaluation: "R$68.000",
    currentBid: "R$51.000",
    auction: "2ª Praça",
    date: "24/08/ 16h",
    auctioneer: "Motor Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "6",
    marca: "Volkswagen",
    modelo: "Golf",
    year: "2022",
    location: "Belo Horizonte, MG",
    evaluation: "R$95.000",
    currentBid: "R$95.000",
    auction: "2ª Praça",
    date: "26/08/ 16h",
    auctioneer: "Auto Leilões",
    isVerified: true
  },
  {
    id: "7",
    marca: "Mercedes",
    modelo: "C180",
    year: "2020",
    location: "Brasília, DF",
    evaluation: "R$120.000",
    currentBid: "R$135.000",
    auction: "1ª Praça",
    date: "27/08/ 10h",
    auctioneer: "Luxury Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "8",
    marca: "Ford",
    modelo: "EcoSport",
    year: "2019",
    location: "Curitiba, PR",
    evaluation: "R$55.000",
    currentBid: "R$38.500",
    discount: "-30%",
    auction: "2ª Praça",
    date: "28/08/ 15h",
    auctioneer: "Speed Leilões",
    isVerified: true
  },
  {
    id: "9",
    marca: "Porsche",
    modelo: "911",
    year: "2021",
    location: "São Paulo, SP",
    evaluation: "R$850.000",
    currentBid: "R$935.000",
    auction: "Praça única",
    date: "29/08/ 16h",
    auctioneer: "Luxury Motors",
    isNew: true,
    isVerified: true
  },
  {
    id: "10",
    marca: "Fiat",
    modelo: "Uno",
    year: "2018",
    location: "Belo Horizonte, MG",
    evaluation: "R$35.000",
    currentBid: "R$24.500",
    discount: "-30%",
    auction: "3ª Praça",
    date: "30/08/ 10h",
    auctioneer: "Popular Motors",
    isVerified: true
  },
  {
    id: "11",
    marca: "Lamborghini",
    modelo: "Huracán",
    year: "2022",
    location: "Rio de Janeiro, RJ",
    evaluation: "R$1.200.000",
    currentBid: "R$1.200.000",
    auction: "1ª Praça",
    date: "31/08/ 14h",
    auctioneer: "Supercar Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "12",
    marca: "Nissan",
    modelo: "Kicks",
    year: "2020",
    location: "Brasília, DF",
    evaluation: "R$68.000",
    currentBid: "R$74.800",
    auction: "2ª Praça",
    date: "01/09/ 15h",
    auctioneer: "Capital Motors",
    isVerified: true
  },
  {
    id: "13",
    marca: "Jeep",
    modelo: "Compass",
    year: "2021",
    location: "Porto Alegre, RS",
    evaluation: "R$125.000",
    currentBid: "R$87.500",
    discount: "-30%",
    auction: "Praça única",
    date: "02/09/ 11h",
    auctioneer: "SUV Leilões",
    isVerified: true
  },
  {
    id: "14",
    marca: "Ferrari",
    modelo: "F8 Tributo",
    year: "2023",
    location: "São Paulo, SP",
    evaluation: "R$2.800.000",
    currentBid: "R$2.800.000",
    auction: "3ª Praça",
    date: "03/09/ 16h",
    auctioneer: "Elite Motors",
    isNew: true,
    isVerified: true
  },
  {
    id: "15",
    marca: "Peugeot",
    modelo: "208",
    year: "2019",
    location: "Salvador, BA",
    evaluation: "R$52.000",
    currentBid: "R$57.200",
    auction: "1ª Praça",
    date: "04/09/ 12h",
    auctioneer: "Nordeste Motors",
    isVerified: true
  },
  {
    id: "16",
    marca: "Land Rover",
    modelo: "Discovery",
    year: "2020",
    location: "Curitiba, PR",
    evaluation: "R$380.000",
    currentBid: "R$266.000",
    discount: "-30%",
    auction: "2ª Praça",
    date: "05/09/ 13h",
    auctioneer: "Off Road Leilões",
    isVerified: true
  },
  {
    id: "17",
    marca: "McLaren",
    modelo: "570S",
    year: "2021",
    location: "São Paulo, SP",
    evaluation: "R$1.800.000",
    currentBid: "R$1.800.000",
    auction: "Praça única",
    date: "06/09/ 14h",
    auctioneer: "Track Motors",
    isNew: true,
    isVerified: true
  },
  {
    id: "18",
    marca: "Renault",
    modelo: "Kwid",
    year: "2020",
    location: "Fortaleza, CE",
    evaluation: "R$42.000",
    currentBid: "R$46.200",
    auction: "3ª Praça",
    date: "07/09/ 15h",
    auctioneer: "Compacto Motors",
    isVerified: true
  },
  {
    id: "19",
    marca: "Tesla",
    modelo: "Model S",
    year: "2022",
    location: "São Paulo, SP",
    evaluation: "R$650.000",
    currentBid: "R$455.000",
    discount: "-30%",
    auction: "1�� Praça",
    date: "08/09/ 10h",
    auctioneer: "Electric Motors",
    isNew: true,
    isVerified: true
  },
  {
    id: "20",
    marca: "Mitsubishi",
    modelo: "Outlander",
    year: "2019",
    location: "Goiânia, GO",
    evaluation: "R$115.000",
    currentBid: "R$115.000",
    auction: "2ª Praça",
    date: "09/09/ 11h",
    auctioneer: "Central Motors",
    isVerified: true
  },
  {
    id: "21",
    marca: "Aston Martin",
    modelo: "DB11",
    year: "2021",
    location: "Rio de Janeiro, RJ",
    evaluation: "R$2.200.000",
    currentBid: "R$2.420.000",
    auction: "Praça única",
    date: "10/09/ 16h",
    auctioneer: "British Motors",
    isVerified: true
  },
  {
    id: "22",
    marca: "Citroën",
    modelo: "C4 Cactus",
    year: "2020",
    location: "Recife, PE",
    evaluation: "R$58.000",
    currentBid: "R$40.600",
    discount: "-30%",
    auction: "3ª Praça",
    date: "11/09/ 12h",
    auctioneer: "French Motors",
    isVerified: true
  },
  {
    id: "23",
    marca: "Maserati",
    modelo: "Levante",
    year: "2022",
    location: "Brasília, DF",
    evaluation: "R$980.000",
    currentBid: "R$980.000",
    auction: "1ª Praça",
    date: "12/09/ 13h",
    auctioneer: "Italian Motors",
    isNew: true,
    isVerified: true
  },
  {
    id: "24",
    marca: "Subaru",
    modelo: "Forester",
    year: "2020",
    location: "Campo Grande, MS",
    evaluation: "R$145.000",
    currentBid: "R$159.500",
    auction: "2ª Praça",
    date: "13/09/ 14h",
    auctioneer: "Adventure Motors",
    isVerified: true
  },
  {
    id: "25",
    marca: "Bugatti",
    modelo: "Chiron",
    year: "2023",
    location: "São Paulo, SP",
    evaluation: "R$15.000.000",
    currentBid: "R$10.500.000",
    discount: "-30%",
    auction: "Praça única",
    date: "14/09/ 15h",
    auctioneer: "Hypercar Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "26",
    marca: "Suzuki",
    modelo: "Vitara",
    year: "2019",
    location: "Manaus, AM",
    evaluation: "R$85.000",
    currentBid: "R$85.000",
    auction: "3ª Praça",
    date: "15/09/ 10h",
    auctioneer: "Amazônia Motors",
    isVerified: true
  },
  {
    id: "27",
    marca: "Bentley",
    modelo: "Continental GT",
    year: "2021",
    location: "Porto Alegre, RS",
    evaluation: "R$1.500.000",
    currentBid: "R$1.650.000",
    auction: "1ª Praça",
    date: "16/09/ 11h",
    auctioneer: "Luxury South",
    isVerified: true
  },
  {
    id: "28",
    marca: "Kia",
    modelo: "Seltos",
    year: "2021",
    location: "Florianópolis, SC",
    evaluation: "R$95.000",
    currentBid: "R$66.500",
    discount: "-30%",
    auction: "2ª Praça",
    date: "17/09/ 12h",
    auctioneer: "Island Motors",
    isVerified: true
  },
  {
    id: "29",
    marca: "Rolls-Royce",
    modelo: "Phantom",
    year: "2022",
    location: "São Paulo, SP",
    evaluation: "R$3.500.000",
    currentBid: "R$3.500.000",
    auction: "Praça única",
    date: "18/09/ 13h",
    auctioneer: "Royal Motors",
    isNew: true,
    isVerified: true
  },
  {
    id: "30",
    marca: "Chery",
    modelo: "Tiggo 7",
    year: "2020",
    location: "Natal, RN",
    evaluation: "R$78.000",
    currentBid: "R$85.800",
    auction: "3ª Praça",
    date: "19/09/ 14h",
    auctioneer: "Oriental Motors",
    isVerified: true
  },
  {
    id: "31",
    marca: "Lotus",
    modelo: "Evora",
    year: "2021",
    location: "Vitória, ES",
    evaluation: "R$750.000",
    currentBid: "R$525.000",
    discount: "-30%",
    auction: "1ª Praça",
    date: "20/09/ 15h",
    auctioneer: "Sport Motors",
    isVerified: true
  },
  {
    id: "32",
    marca: "Genesis",
    modelo: "G90",
    year: "2022",
    location: "Cuiabá, MT",
    evaluation: "R$420.000",
    currentBid: "R$420.000",
    auction: "2ª Praça",
    date: "21/09/ 16h",
    auctioneer: "Premium Center",
    isNew: true,
    isVerified: true
  },
  {
    id: "33",
    marca: "Koenigsegg",
    modelo: "Regera",
    year: "2023",
    location: "São Paulo, SP",
    evaluation: "R$12.000.000",
    currentBid: "R$13.200.000",
    auction: "Praça única",
    date: "22/09/ 10h",
    auctioneer: "Megacar Leilões",
    isNew: true,
    isVerified: true
  },
  {
    id: "34",
    marca: "JAC",
    modelo: "T60",
    year: "2020",
    location: "João Pessoa, PB",
    evaluation: "R$125.000",
    currentBid: "R$87.500",
    discount: "-30%",
    auction: "3ª Praça",
    date: "23/09/ 11h",
    auctioneer: "Nordeste Pickup",
    isVerified: true
  },
  {
    id: "35",
    marca: "Pagani",
    modelo: "Huayra",
    year: "2022",
    location: "Rio de Janeiro, RJ",
    evaluation: "R$8.500.000",
    currentBid: "R$8.500.000",
    auction: "1ª Praça",
    date: "24/09/ 12h",
    auctioneer: "Artcar Leilões",
    isNew: true,
    isVerified: true
  }
];

const propertyCategories = [
  { name: "Todas", count: 149, active: true },
  { name: "Comercial", count: 149, active: false },
  { name: "Hospedagem", count: 149, active: false },
  { name: "Industrial", count: 149, active: false },
  { name: "Residencial", count: 149, active: false },
  { name: "Rural", count: 249, active: false },
  { name: "Outros", count: 100, active: false }
];

const vehicleCategories = [
  { name: "Todas", count: 1456, active: true },
  { name: "Veículos Aéreos", count: 45, active: false },
  { name: "Veículos de Apoio", count: 123, active: false },
  { name: "Embarcações", count: 89, active: false },
  { name: "Veículos Leves", count: 567, active: false },
  { name: "Máquinas Agr��colas", count: 234, active: false },
  { name: "Máquinas de Construção", count: 189, active: false },
  { name: "Veículos Pesado", count: 156, active: false },
  { name: "Veículos de Lazer", count: 78, active: false },
  { name: "Outros", count: 67, active: false }
];

export default function Index() {
  // Detectar se é mobile para definir viewMode padrão
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const [activeTab, setActiveTab] = useState("Imóveis");
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? "list" : "grid";
    }
    return "grid";
  });
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para rastrear filtros ativos (agora vem da sidebar)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [sidebarKey, setSidebarKey] = useState(0);

  // Função para resetar filtros
  const handleResetFilters = () => {
    setActiveFiltersCount(0);
    // Força re-render das sidebars com estado inicial
    setSidebarKey(prev => prev + 1);
  };

  // Callback para receber contagem de filtros da sidebar
  const handleFiltersCountChange = (count: number) => {
    setActiveFiltersCount(count);
  };

  // Supabase-loaded data
  const [propertyData, setPropertyData] = useState<PropertyCardData[]>([]);
  const [vehicleData, setVehicleData] = useState<VehicleCardData[]>([]);

  const itemsPerPage = 33;
  const totalItems = 42000; // From the stats - "Encontramos 42.000 leilões"
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, vehRes] = await Promise.all([
          supabase
            .from("lots_property")
            .select("_id, property_category, property_type_std1, useful_area_m2, state, city, appraised_value, initial_bid_value, stage, end_date, origin")
            .limit(itemsPerPage),
          supabase
            .from("lots_vehicle")
            .select("_id, vehicle_category, vehicle_type_std, brand, model, year, state, city, appraised_value, initial_bid_value, stage, end_date, origin")
            .limit(itemsPerPage),
        ]);

        if (propRes.error) throw propRes.error;
        if (vehRes.error) throw vehRes.error;

        const mappedProperties: PropertyCardData[] = (propRes.data || []).map((row: any) => ({
          id: String(row._id ?? crypto.randomUUID()),
          type: row.property_type_std1 || row.property_category || "Imóvel",
          area: row.useful_area_m2 ? `${row.useful_area_m2}m²` : undefined,
          location: formatLocation(row.city, row.state),
          evaluation: formatBRL(row.appraised_value),
          currentBid: formatBRL(row.initial_bid_value),
          discount: computeDiscount(row.appraised_value, row.initial_bid_value),
          auction: row.stage || "",
          date: formatDateLabel(row.end_date),
          auctioneer: row.origin || "Leilão",
          isVerified: true,
        }));

        const mappedVehicles: VehicleCardData[] = (vehRes.data || []).map((row: any) => ({
          id: String(row._id ?? crypto.randomUUID()),
          marca: row.brand || "Veículo",
          modelo: row.model || "",
          year: row.year || undefined,
          location: formatLocation(row.city, row.state),
          evaluation: formatBRL(row.appraised_value),
          currentBid: formatBRL(row.initial_bid_value),
          discount: computeDiscount(row.appraised_value, row.initial_bid_value),
          auction: row.stage || "",
          date: formatDateLabel(row.end_date),
          auctioneer: row.origin || "Leilão",
          isVerified: true,
        }));

        setPropertyData(mappedProperties);
        setVehicleData(mappedVehicles);
      } catch (e: any) {
        toast({ title: "Erro ao carregar dados", description: e.message || "Falha ao consultar o Supabase." });
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);

  // Calculate items to show based on current page and active tab
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = activeTab === "Imóveis" ? (propertyData.length ? propertyData : properties) : (vehicleData.length ? vehicleData : vehicles);
  const displayedItems = currentData.slice(0, Math.min(currentData.length, itemsPerPage));

  return (
    <div className="min-h-screen bg-white font-montserrat">

      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-8 xl:px-16">
        <ControlsBar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sidebarVisible={sidebarVisible}
          onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
          activeFiltersCount={activeFiltersCount}
          onResetFilters={handleResetFilters}
          resetKey={sidebarKey}
        />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-8 md:pb-16">
          {sidebarVisible && (
            <div className="hidden lg:block">
              {activeTab === "Imóveis" ? (
                <Sidebar
                  key={`sidebar-${sidebarKey}`}
                  categories={propertyCategories}
                  onFiltersCountChange={handleFiltersCountChange}
                />
              ) : (
                <VehicleSidebar
                  key={`vehicle-sidebar-${sidebarKey}`}
                  categories={vehicleCategories}
                  onFiltersCountChange={handleFiltersCountChange}
                />
              )}
            </div>
          )}

          <div className="flex-1">
            <StatsBar />

            <div className={viewMode === "list"
              ? "flex flex-col gap-2"
              : `grid grid-cols-1 gap-4 md:gap-[18px] ${
                  sidebarVisible ? "md:grid-cols-2" : "md:grid-cols-3"
                }`
            }>
              {displayedItems.map((item) => {
                const isProperty = activeTab === "Imóveis";
                const propertyItem = item as PropertyCardData;
                const vehicleItem = item as VehicleCardData;

                return (
                  <AuctionCard
                    key={item.id}
                    id={item.id}
                    title={isProperty ? propertyItem.type : `${vehicleItem.marca} ${vehicleItem.modelo}`}
                    subtitle={isProperty ? propertyItem.area : vehicleItem.year}
                    location={item.location}
                    evaluation={item.evaluation}
                    currentBid={item.currentBid}
                    auctioneer={item.auctioneer}
                    date={item.date}
                    discount={item.discount}
                    isNew={item.isNew}
                    isVerified={item.isVerified}
                    layout={viewMode === "grid" ? "vertical" : "horizontal"}
                    auctionType={isProperty ? "property" : "vehicle"}
                  />
                );
              })}
            </div>

            <PropertyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Spacing for mobile navbar */}
      <div className="h-60 md:hidden"></div>

      {/* Botão flutuante para filtros no mobile */}
      <FloatingFilterButton onClick={() => setMobileFilterOpen(true)} />

      {/* Modal de filtros para mobile */}
      <FilterModal
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        categories={activeTab === "Imóveis" ? propertyCategories : vehicleCategories}
        type={activeTab === "Imóveis" ? "property" : "vehicle"}
      />

      {/* Barra de navegação inferior para mobile */}
      <MobileBottomNavigation
        activeTab={activeTab === "Imóveis" ? "home" : "car"}
        onTabChange={(tabId) => {
          const tabMap = { home: "Imóveis", car: "Veículos", heart: "Favoritos", gavel: "Leilões", user: "Perfil" };
          setActiveTab(tabMap[tabId as keyof typeof tabMap] || "Imóveis");
        }}
      />
    </div>
  );
}
