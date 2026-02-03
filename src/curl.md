$ curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{
"email": "nuevo@example.com",
"password": "Password123!"
}'
{"status":"success","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODI1MDI3MDIwMmJmNWMyYzU4Mzg4NSIsInVzZXJJZCI6IjY5ODI1MDI3MDIwMmJmNWMyYzU4Mzg4NSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwMTQ4NTcxLCJleHAiOjE3NzAyMzQ5NzEsImlzcyI6IkFiZWwgTSBHYXJjaWEifQ.vZonid0qPZMU6HF4KcBCXMspoRFXrrNcnCEhESp2Fhg"}

------crear usuario admin-------
curl -X POST http://localhost:3000/login/register \
 -H "Content-Type: application/json" \
 -d '{
"username": "admin_user",
"email": "admin@example.com",
"password": "AdminPass123!"
}'
{"status":"success","message":"Usuario registrado con éxito","data":{"userId":null}}
en database
db.duenos.updateOne(
{ email: "admin@example.com" },
{ $set: { role: "admin" } }
)

-------login usuario admin------
curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{
"email": "admin@example.com",
"password": "AdminPass123!"
}'

-------crear dueno-----------
$ curl -X POST http://localhost:3000/api/ -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODI1NDdkMzhkNGQxMzFmMDIzYjYyNyIsInVzZXJJZCI6IjY5ODI1NDdkMzhkNGQxMzFmMDIzYjYyNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDE1MTQ1NywiZXhwIjoxNzcwMjM3ODU3LCJpc3MiOiJBYmVsIE0gR2FyY2lhIn0.vrZ8mcJTdyiC9XX6OFuXVhDe8hFRQyhlAMxr27PggaU" -d '{
"username": "nuevo_dueno",
"email": "dueno@example.com",
"password": "Password123!"
}'
c9-49014aa73153{"username":"nuevo_dueno","email":"dueno@example.com","role":"user","createdAt":"2026-02-03T21:07:43.119Z","updatedAt":"
2026-02-03T21:07:43.119Z","id":"6982639f672883b99d33abcf"}

---------obtener todos los dueños---------
curl -X GET http://localhost:3000/api/ \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODI1NDdkMzhkNGQxMzFmMDIzYjYyNyIsInVzZXJJZCI6IjY5ODI1NDdkMzhkNGQxMzFmMDIzYjYyNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDE1MTQ1NywiZXhwIjoxNzcwMjM3ODU3LCJpc3MiOiJBYmVsIE0gR2FyY2lhIn0.vrZ8mcJTdyiC9XX6OFuXVhDe8hFRQyhlAMxr27PggaU"

-----------obtener dueño por id-------------
curl -X GET http://localhost:3000/api/6982639f672883b99d33abcf \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODI1NDdkMzhkNGQxMzFmMDIzYjYyNyIsInVzZXJJZCI6IjY5ODI1NDdkMzhkNGQxMzFmMDIzYjYyNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDE1MTQ1NywiZXhwIjoxNzcwMjM3ODU3LCJpc3MiOiJBYmVsIE0gR2FyY2lhIn0.vrZ8mcJTdyiC9XX6OFuXVhDe8hFRQyhlAMxr27PggaU"

-----------actualizar dueño----------
curl -X PUT http://localhost:3000/api/698254327dd1f023b627 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <tu_token_admin>" \
 -d '{
"username": "dueno_actualizado",
"email": "dueno_nuevo@example.com"
}'

---------borrar dueno--------
curl -X DELETE http://localhost:3000/api/698254327dd1f023b627 \
 -H "Authorization: Bearer <tu_token_admin>"
