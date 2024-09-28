#####################################################################

#                            Build Stage                            #

#####################################################################

FROM hugomods/hugo:exts as builder

# Base URL

ARG HUGO_ENV

ENV HUGO_ENV=${HUGO_ENV}

# Build site

COPY . /src
RUN hugo --minify --gc --enableGitInfo --config ${HUGO_ENV}

# Set the fallback 404 page if defaultContentLanguageInSubdir is enabled, please replace the `en` with your default language code.

# RUN cp ./public/en/404.html ./public/404.html


#####################################################################

#                            Final Stage                            #

#####################################################################

FROM hugomods/hugo:nginx

# Copy the generated files to keep the image as small as possible.

COPY --from=builder /src/public /site
