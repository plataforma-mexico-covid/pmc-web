FROM nginx
COPY dist/covid19 /usr/share/nginx/html/covid19
COPY politicaprivacidad.pdf /usr/share/nginx/html/covid19/politicaprivacidad.pdf
COPY guiadeuso.pdf /usr/share/nginx/html/covid19/guiadeuso.pdf
COPY nginx.conf /etc/nginx/nginx.conf