namespace Morah.Web.Components.Properties;
public record TechnicalSheetItem(string Label, string Value, string? Section = null);
public static class TechnicalSheetExample
{
    // Mockup transcrito da referência enviada pelo usuário; não são dados comerciais validados.
    public static readonly IReadOnlyList<IReadOnlyList<TechnicalSheetItem>> Groups = [
        new TechnicalSheetItem[] {
            new("Endereço", "São José dos Campos – SP"),
            new("Status", "Lançamento"),
            new("Área do terreno", "12.000 m² (exemplo)"),
            new("Torres", "4 torres"),
            new("Pavimentos", "4 andares + térreo"),
            new("Total de unidades", "128 unidades (exemplo)")
        },
        new TechnicalSheetItem[] {
            new("Tipologias", "2 quartos (43 a 50 m²)"),
            new("Vagas", "1 vaga por unidade (exemplo)"),
            new("Elevadores", "Sim"),
            new("Lazer", "Completo (ver seção de lazer)", "lazer"),
            new("Segurança", "Condomínio fechado com portaria"),
            new("Realização", "Morah + Parceiros")
        }
    ];
}
