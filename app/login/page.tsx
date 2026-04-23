"use client";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: whitesmoke;
  padding: calc(2px + 2vw);
  flex-direction: column;
`;

const CardDiv = styled.div`
  width: 40%;
  background: ghostwhite;
  padding: 5%;
`;

const ToggleWrapper = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  background: lightgray;
  padding: 0.5%;
`;

const Slider = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 5%;
  left: ${({ $checked }) =>
    $checked ? "calc(2px + 51%)" : "calc(2px + 0.5%)"};
  width: calc(2px + 48%);
  height: calc(2px + 88%);
  background: black;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  position: relative;
  color: ${({ $active }) => ($active ? "white" : "dimgray")};
  font-size: calc(2px + 1vw);
  font-weight: bold;
  padding: calc(2px + 1vh) 0;
  cursor: pointer;
`;

const Title = styled.h1`
  color: black;
  font-size: calc(2px + 2vw);
  margin-top: 3%;
  margin-bottom: 3%;
`;

const Text = styled.p`
  color: dimgray;
  font-size: calc(2px + 1vw);
  margin-bottom: 3%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1vw;
`;

const Input = styled.input`
  width: 100%;
  background: white;
  color: black;
  border: solid gray 1px;
  padding: 1% 1%;
  font-size: calc(2px + 1vw);
`;

const SubmitButton = styled.button`
  width: 100%;
  background: black;
  color: white;
  padding: 1%;
  font-size: calc(2px + 1vw);
  cursor: pointer;
`;

const Message = styled.p`
  color: firebrick;
  font-size: calc(2px + 1vw);
`;

const SiteTitle = styled.h1`
  font: calc(2px + 2vw) bold;
  margin-bottom: 5%;
`;

export default function Login() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isRegister = checked;

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setError("");

    const route = isRegister ? "/api/auth/register" : "/api/auth/login";

    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <PageWrapper>
      <SiteTitle>Simple Shop</SiteTitle>
      <CardDiv>
        <ToggleWrapper>
          <Slider $checked={checked} />
          <ToggleButton
            type="button"
            $active={!isRegister}
            onClick={() => setChecked(false)}
          >
            Login
          </ToggleButton>
          <ToggleButton
            type="button"
            $active={isRegister}
            onClick={() => setChecked(true)}
          >
            Register
          </ToggleButton>
        </ToggleWrapper>

        <Title>{isRegister ? "Create account" : "Welcome back"}</Title>
        <Text>
          {isRegister
            ? "Register to create an account"
            : "Sign in with your email and password"}
        </Text>

        <Form onSubmit={handleSubmit}>
          {isRegister && (
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <SubmitButton type="submit">
            {isRegister ? "Register" : "Login"}
          </SubmitButton>
        </Form>
        {error && <Message>{error}</Message>}
      </CardDiv>
    </PageWrapper>
  );
}
