import React from "react";
import { IonRouterLink, IonLabel } from "@ionic/react";

export function CalendarLinks() {
    return (
      <div className="ion-padding" slot="content">
        <LinkComponent path="/AudioRecord">
        Audio Record
        </LinkComponent>
        <hr className="red-hr" style={{ marginTop: "10px", marginBottom: "10px" }} />
        <LinkComponent path="/History">
          History
        </LinkComponent>
      </div>
    );
}

function LinkComponent({ path, children }:any) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <IonRouterLink href={path}>
        <IonLabel style={{ color: "black", fontWeight: "bold" }}>
          {children}
        </IonLabel>
      </IonRouterLink>
    </div>
  );
}
