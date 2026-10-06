namespace Morah.Web.Components.Properties;
public record PropertyPreview(string Key, string Image, string Status, string StatusKey, string Rooms, string Benefit, bool Editorial = false, string? Program = null)
{
 public string Name { get; init; } = "Nome do empreendimento";
 public string Location { get; init; } = "Cidade — UF";
 public string Area { get; init; } = "43 a 50 m²";
 public string Type { get; init; } = "apartamento";
 public string[] Amenities { get; init; } = [];
 public bool HasRoom(string value) => value == "4" ? Rooms.StartsWith("4") : Rooms.Split(' ').Contains(value);
 public bool OverlapsArea(int? minimum, int? maximum)
 {
  if (!minimum.HasValue && !maximum.HasValue) return true;
  var values = System.Text.RegularExpressions.Regex.Matches(Area, @"\d+")
   .Select(match => int.TryParse(match.Value, out var value) ? value : 0)
   .Where(value => value > 0)
   .ToArray();
  if (values.Length == 0) return false;
  var itemMinimum = values.Min();
  var itemMaximum = values.Max();
  return itemMaximum >= (minimum ?? 0) && itemMinimum <= (maximum ?? int.MaxValue);
 }
}
public static class HomeProperties
{
    public static readonly PropertyPreview[] Items = CatalogProperties.Items.Take(5).ToArray();
}
