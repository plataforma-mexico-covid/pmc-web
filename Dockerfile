FROM nginx
COPY dist/covid19 /usr/share/nginx/html/covid19
COPY terminosycondiciones.pdf /usr/share/nginx/html/covid19/terminosycondiciones.pdf
COPY avisoprivacidad.pdf /usr/share/nginx/html/covid19/avisoprivacidad.pdf
COPY politicaprivacidad.pdf /usr/share/nginx/html/covid19/politicaprivacidad.pdf
COPY guiadeuso.pdf /usr/share/nginx/html/covid19/guiadeuso.pdf
COPY nginx.conf /etc/nginx/nginx.conf