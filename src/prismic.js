import * as prismic from "@prismicio/client";

export const repositoryName = 'ambrosus-staking';
const endpoint = prismic.getEndpoint(repositoryName);

export const client = prismic.createClient(endpoint, {
    accessToken: "",
    routes: [
        {
            type: "staking-homepage",
            path: "/staking-homepage",
        },
        {
            type: "header-type",
            path: "/header-type",
        },
        {
            type: "footer-type",
            path: "/footer-type",
        },
    ],
});
