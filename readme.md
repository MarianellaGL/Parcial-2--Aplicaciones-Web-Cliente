# Proyecto: Demo de Sitio Web

## Descripción General

Este proyecto es una demo para un sitio web solicitado por la empresa. El sitio incluye autenticación de usuario y funcionalidades para determinar el género y la nacionalidad probable de un nombre.

## Requisitos

El sistema debe cumplir con los siguientes requisitos:

1. **Autenticación de usuario mediante Login**.
2. **Determinación de género a partir de un nombre**.
3. **Determinación de nacionalidad a partir de un nombre**.

## Funcionalidades

### 1. Autenticación - Login

- La aplicación debe tener una página de Login como vista principal.
- Validación de credenciales contra la API: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users).
  - **Usuario**: Se valida con la key `email`.
  - **Clave**: Se valida con la key `address.geo.lat`.

**Ejemplo**:

- Usuario: `Sincere@april.biz`
- Clave: `81.1496`

### 2. Determinación de Género

- Página principal con formulario para ingresar un nombre.
- Uso de la API [Genderize](https://genderize.io/) para determinar el género basado en el nombre.

**Ejemplo**:  
`https://api.genderize.io/?name=alex`

- Respuesta: `{ "name": "alex", "gender": "male", "probability": 0.96 }`

### 3. Determinación de Nacionalidad

- Uso de la API [Nationalize](https://nationalize.io/) para determinar las nacionalidades probables del nombre.

**Ejemplo**:  
`https://api.nationalize.io/?name=alex`

- Respuesta: `{ "name": "alex", "country": [{ "country_id": "US", "probability": 0.25 }, { "country_id": "GB", "probability": 0.08 }] }`

### 4- Extra
- Se genero un tooltip que se ubique bajo el country-id para mayor legibilidad y entendimiento del usuario

## Tecnologías Utilizadas

- **Frontend**: HTML, CSS, JavaScript.
- **APIs**:
  - [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
  - [Genderize](https://genderize.io/)
  - [Nationalize](https://nationalize.io/)
  - [Rest Countries](https://restcountries.com/)
