namespace Morah.Web.Components.Properties;
public record PropertyPreview(string Key, string Image, string Status, string StatusKey, string Rooms, string Benefit, bool Editorial = false, string? Program = null)
{
 public string Name { get; init; } = "Nome do empreendimento";
 public string Location { get; init; } = "Cidade — UF";
 public string Area { get; init; } = "43 a 50 m²";
 public string Type { get; init; } = "apartamento";
 public string[] Amenities { get; init; } = [];
 public bool HasRoom(string value) => value == "4" ? Rooms.StartsWith("4") : Rooms.Split(' ').Contains(value);
}
public static class HomeProperties
{
    public static readonly PropertyPreview[] Items = CatalogProperties.Items.Take(5).ToArray();
}
