import React from "react";
import Typography from "funuicss/component/Typography";
import Div from "funuicss/component/Div";
import Icon from "funuicss/component/Icon";
import Button from "funuicss/component/Button";
import Container from "funuicss/component/Container";
import RowFlex from "funuicss/component/RowFlex";

export default function App() {
  return (
    <div>
      <Container>
        <Div minHeight="100vh" width="100%" padding="4rem 0" funcss="central">
          <Div maxWidth="600px" funcss="text-center">
            <Typography text="404" heading="h5" color="primary" block />
            <Div margin="1.4rem 0">
              <Typography
                text="Page Not Found"
                size="bigger"
                color="secondary"
                block
              />
            </Div>
            <Div funcss="article">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </Div>
            <Div margin="2rem 0">
              <RowFlex gap="0.4rem" justify="center">
                <Button
                  startIcon={<Icon icon="fas fa-home" />}
                  text="Go Back Home"
                  bg="primary"
                />
                <Button
                  endIcon={<Icon icon="fas fa-angle-right" />}
                  text="Contact Support"
                  color="primary"
                />
              </RowFlex>
            </Div>
          </Div>
        </Div>
      </Container>
    </div>
  );
}
