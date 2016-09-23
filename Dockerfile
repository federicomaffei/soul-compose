FROM node:4-onbuild
EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/node", "index.js"]
