namespace Morah.Web.Components.Properties;
public record PropertyPreview(string Key, string Image, string Status, string StatusKey, string Rooms, string Benefit, bool Editorial = false, string? Program = null);
public static class HomeProperties
{
    // Conteúdo demonstrativo conservado das instâncias do Figma.
    public static readonly PropertyPreview[] Items = [
        new("breve-lancamento", "property-prelaunch.png", "Breve lançamento", "prelancamento", "2 quartos", "Subsídio disponível"),
        new("lancamento", "property-launch.png", "LANÇAMENTO", "lancamento", "2 quartos", "Condomínio fechado", true),
        new("em-construcao", "property-construction.png", "Em construção", "construcao", "1 e 2 quartos", "Entrada facilitada"),
        new("pronto", "property-ready.jpeg", "Pronto para morar", "pronto", "2 quartos", "Entrada facilitada"),
        new("lancamento-editorial", "property-launch.png", "LANÇAMENTO", "lancamento", "2 quartos", "Condomínio fechado", true)
    ];
}
