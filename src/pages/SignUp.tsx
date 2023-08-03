import React from "react";
import styled from "styled-components";
import mainLogo from "../assets/mainLogo.svg";
import { NavigationBar, Container } from "./Index";
import { SignUpValidated } from "../utils";

export const SignUp = () => {
    return (
        <>
            <Container>
                <div>
                    <SignUpDiv>
                        <SignUpImg src={mainLogo}></SignUpImg>
                        <H1>회원가입</H1>
                    </SignUpDiv>
                    <SignUpFormDiv>
                        <UserView />
                    </SignUpFormDiv>
                </div>
                <NavigationBar />
            </Container>
        </>
    );
};
export default SignUp;

const UserView = () => {
    return (
        <>
            <SignUpValidated />
        </>
    );
};

const SignUpDiv = styled.div`
    margin-top: 4%;
`;

const SignUpImg = styled.img`
    padding: 3% 3% 0 3%;
`;

const H1 = styled.p`
    font-size: 38px;
    margin: 0;
    padding: 2%;
    color: #00ad5c;
    font-weight: 700;
`;

const SignUpFormDiv = styled.div`
    width: 100%;
    margin: 0 auto 10% auto;
`;
