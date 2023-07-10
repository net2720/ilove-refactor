import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import styled from "styled-components";
import { FontSize } from "./constants/FontSize";
import { BorderRadius, BorderColor } from "./constants/Border";
import { JoinButton } from "./components/BasicButton";

interface IFormInput {
  email: string;
  pw: string;
}

export const LoginValidated = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      pw: "",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{3,3}$/i,
              message: "이메일 형식이 맞지않습니다.",
            },
          })}
          placeholder="이메일을 입력해주세요"
        />
        {errors?.email ? (
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        ) : null}
        <LoginInput
          {...register("pw", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              message: "4글자 이상 입력해주세요",
              value: 4,
            },
          })}
          placeholder="비밀번호를 입력해주세요"
        />
        {errors?.pw ? <ErrorMessage>{errors.pw?.message}</ErrorMessage> : null}

        <LoginBtn>
          <JoinButton>로그인</JoinButton>
        </LoginBtn>
      </LoginForm>
    </>
  );
};

const LoginForm = styled.form`
  border: ${BorderColor.normalBorder};
  border-radius: ${BorderRadius.inputRadius};
  padding: 6%;
  text-align: center;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);
`;
const LoginInput = styled.input.attrs((props) => ({
  placeholder: props.placeholder,
}))`
  padding: 4%;
  width: 90%;
  margin: 2% auto;
  border-radius: ${BorderRadius.inputRadius};
  border: ${BorderColor.thinBorder};
  font-size: ${FontSize.h3};
`;

const LoginBtn = styled.div`
  border-radius: ${BorderRadius.inputRadius};
  width: 98%;
  margin: 0 auto;
`;

const ErrorMessage = styled.p`
  color: #c20000;
`;
