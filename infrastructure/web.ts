import { isProduction } from "./stage";

new sst.aws.React("Web", {
  ...(isProduction && {
    domain: {
      name: "roam.fish",
      redirects: ["www.roam.fish"],
    },
  }),
});
