namespace Morah.Web.Components.Properties;

public static class CatalogProperties
{
    // As seis instâncias visíveis no catálogo Figma, sem inventar o restante do portfólio.
    public static readonly PropertyPreview[] Items = [
        HomeProperties.Items[0],
        HomeProperties.Items[1],
        new("pronto-editorial", "catalog-ready.png", "PRONTO PARA MORAR", "pronto", "2 quartos", "Condomínio fechado", true),
        HomeProperties.Items[2],
        new("pronto-um-quarto", "catalog-ready-standard.png", "Pronto para morar", "pronto", "1 quarto", "Condomínio fechado", false, "Financiamento Caixa"),
        new("construcao-editorial", "catalog-garden.png", "EM CONSTRUÇÃO", "construcao", "2 quartos", "Condomínio fechado", true)
    ];
}
