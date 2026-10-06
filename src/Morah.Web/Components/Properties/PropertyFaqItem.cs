namespace Morah.Web.Components.Properties;
public record PropertyFaqItem(string Question, string Answer, string? Section = null, string? SectionName = null);
public static class PropertyFaqExamples
{
    // Perguntas de demonstração; respostas lorem autorizadas para compor e testar o accordion.
    public static readonly IReadOnlyList<PropertyFaqItem> Items = [
        new("Quais são as tipologias disponíveis?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Consulte as opções e características demonstrativas do projeto.", "plantas", "Plantas"),
        new("Quais espaços de lazer o empreendimento oferece?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean massa. Os itens visuais desta seção são demonstrativos e podem ser substituídos pelo conteúdo final.", "lazer", "Lazer"),
        new("Onde fica o empreendimento?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Confira o endereço e os pontos de interesse apresentados no mapa.", "localizacao", "Localização"),
        new("Como posso solicitar mais informações?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Use o formulário Quero mais informações para visualizar os dados necessários. O envio ainda não está conectado.")
    ];
}
