import React from "react";
import { PageIntro } from "../components/PageIntro";

export function Mission() {
  return (
    <div className="pb-50">
      <PageIntro eyebrow="Mission" title="Connecting Communities">
        <p>
          Urban Pulse aims to connect and engage communities by providing tools
          for information sharing, discussion, and collaboration on local issues
          and events.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Urban Pulse was created to empower neighborhoods by offering a platform
            where residents can voice their concerns, share ideas, and work together
            to enhance their communities. The goal is to foster unity and collective action.
          </p>
          <p>
            Urban Pulse values inclusivity and accessibility, ensuring every community
            member feels heard and valued. By providing a space for open dialogue and
            collaboration, Urban Pulse helps bridge the gap between community members
            and local leaders, facilitating transparency and mutual understanding.
          </p>
        </div>
      </PageIntro>
    </div>
  );
}
