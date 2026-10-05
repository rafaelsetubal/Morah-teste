namespace Morah.Web.Components.Properties;
public static class CatalogProperties
{
 // Dados fictícios autorizados para exercitar filtros; imagens existentes preservadas.
 public static readonly PropertyPreview[] Items = [
 new("breve-lancamento", "property-prelaunch.png", "Breve lançamento", "prelancamento", "1 quarto", "Subsídio disponível", false, "Minha Casa Minha Vida") { Name="Studio Aurora", Location="Campinas — SP", Area="32 a 38 m²", Amenities=["academia","pet"] },
 new("lancamento", "property-launch.png", "LANÇAMENTO", "lancamento", "2 quartos", "Condomínio fechado", true, "Piscina") { Name="Jardins do Sol", Location="Taubaté — SP", Area="45 a 52 m²", Amenities=["piscina","playground","festas"] },
 new("pronto-editorial", "catalog-ready.png", "PRONTO PARA MORAR", "pronto", "3 quartos", "Condomínio fechado", true, "Espaço pet") { Name="Residencial Ipê", Location="São José dos Campos — SP", Area="78 a 92 m²", Type="casa", Amenities=["pet","churrasqueira","playground"] },
 new("em-construcao", "property-construction.png", "Em construção", "construcao", "1 e 2 quartos", "Entrada facilitada", false, "Academia") { Name="Vista do Parque", Location="Campinas — SP", Area="43 a 50 m²", Amenities=["academia","piscina","pet"] },
 new("pronto-um-quarto", "catalog-ready-standard.png", "Pronto para morar", "pronto", "4 quartos", "Entrada facilitada", false, "Financiamento Caixa") { Name="Vila das Palmeiras", Location="Jacareí — SP", Area="96 a 120 m²", Type="casa", Amenities=["churrasqueira","festas"] },
 new("construcao-editorial", "catalog-garden.png", "OBRAS AVANÇADAS", "avancadas", "3 quartos", "Condomínio fechado", true, "Salão de festas") { Name="Alameda Morah", Location="Pindamonhangaba — SP", Area="65 a 74 m²", Amenities=["piscina","festas","playground"] }
 ];
 public static readonly SearchOption[] AmenityOptions=[new("piscina","Piscina"),new("academia","Academia"),new("playground","Playground"),new("festas","Salão de festas"),new("churrasqueira","Churrasqueira"),new("pet","Espaço pet")];
}
