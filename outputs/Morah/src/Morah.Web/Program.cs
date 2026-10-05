using Morah.Web.Components;
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);
// Opt-in local: não usa as chaves do usuário durante validação em sandbox.
if (builder.Environment.IsDevelopment() &&
    builder.Configuration.GetValue<bool>("Development:EphemeralDataProtection"))
{
    builder.Services.AddDataProtection().UseEphemeralDataProtectionProvider();
}
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/erro", createScopeForErrors: true);
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseAntiforgery();
app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();

