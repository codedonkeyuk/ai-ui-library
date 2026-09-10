import { MemoryRouter } from "react-router";
import { MainNavigation } from "../../../../lib";
import type { ColorConfigItem } from "../Types";

const navigationStyles: ColorConfigItem = {
  properties: {
    "main-nav-bg-color": {
      light: "#ffffff",
      dark: "#000000",
    },
  },
  example: () => (
    <MemoryRouter>
      <div className="container">
        <MainNavigation
          links={[
            {
              to: "/sitea",
              name: "Site A",
            },
            {
              to: "/siteb",
              name: "Site B",
            },
            {
              to: "/sitec",
              name: "Site C",
              sublinks: [
                {
                  to: "/sitec1",
                  name: "Site C-1",
                },
                {
                  to: "/sitec2",
                  name: "Site C-2",
                },
                {
                  to: "/sitec3",
                  name: "Site C-3",
                  sublinks: [
                    {
                      to: "/sitec3a",
                      name: "Site C 3 A",
                    },
                    {
                      to: "/sitec3b",
                      name: "Site  C 3 B",
                    },
                    {
                      to: "/sitec3c",
                      name: "Site  C 3 C",
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </div>
    </MemoryRouter>
  ),
};

export default navigationStyles;
