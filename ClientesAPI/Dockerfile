# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar solo archivos del backend
COPY ClientesAPI/*.csproj ./ClientesAPI/
WORKDIR /src/ClientesAPI
RUN dotnet restore

# Copiar el resto del código
COPY ClientesAPI/. ./ 

RUN dotnet publish -c Release -o /app/publish

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "ClientesAPI.dll"]