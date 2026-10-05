namespace Morah.Web.Components.Navigation;
public record NavigationLink(string Label, string Href);
public static class SiteNavigation
{
    public static readonly NavigationLink[] Main = [
        new("Home", "/"), new("Encontre seu apê", "/empreendimentos"),
        new("Conheça a Morah", "/conheca-a-morah"), new("Contato", "/contato"),
        new("Perguntas frequentes", "/perguntas-frequentes"), new("Blog", "/blog")
    ];
}
