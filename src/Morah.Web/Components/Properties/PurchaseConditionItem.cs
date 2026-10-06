using Morah.Web.Components.Shared;
namespace Morah.Web.Components.Properties;
public record PurchaseConditionItem(string Title, string Description, MorahIconName Icon);
public static class PurchaseConditionExamples
{
    public static readonly IReadOnlyList<PurchaseConditionItem> Items = [
        new("Minha Casa Minha Vida", "Condições e subsídios conforme perfil e regras vigentes.", MorahIconName.Home),
        new("Uso do seu FGTS", "Pode compor a entrada, conforme critérios aplicáveis.", MorahIconName.Savings),
        new("Financiamento facilitado", "Opções de financiamento com instituições parceiras.", MorahIconName.Payments),
        new("Assessoria especializada", "Acompanhamento da equipe nas etapas do processo.", MorahIconName.Shield)
    ];
}
