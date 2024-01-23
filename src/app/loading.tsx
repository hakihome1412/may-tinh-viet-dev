import Container from "@/components/layouts/container";
import MainLayout from "@/components/layouts/main-layout";
import Loading from "@/components/loading";
import React from "react";

export default function HomeLoading() {
  return (
    <MainLayout>
      <Container>
        <Loading />
      </Container>
    </MainLayout>
  );
}
