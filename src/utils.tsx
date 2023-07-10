import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import styled from "styled-components";
import { FontSize } from "./constants/FontSize";
import { BorderRadius, BorderColor } from "./constants/Border";
import { JoinButton } from "./components/BasicButton";

interface IFormInput {
  email: string;
  pw: string;
  checkPw?: string;
  name?: string;
  phoneNumber?: string;
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
        <InputTitle>이메일</InputTitle>
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

        <InputTitle>비밀번호</InputTitle>
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

export const SignUpValidated = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      pw: "",
      name: "",
      phoneNumber: "",
      checkPw: "",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    if (data.pw !== data.checkPw) {
      setError(
        "checkPw",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
    console.log(errors);
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <InputTitle>이름</InputTitle>
        <LoginInput
          {...register("name", {
            required: "이름을 입력해주세요",
            minLength: 1,
          })}
          placeholder="이름을 입력해주세요"
        />
        {errors?.name ? (
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        ) : null}

        <InputTitle>이메일</InputTitle>
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

        <InputTitle>연락처</InputTitle>
        <LoginInput
          {...register("phoneNumber", {
            required: "연락처를 입력해주세요",
            pattern: {
              value: /^\d{3}-\d{3,4}-\d{4}$/,
              message: "01X-XXXX-XXXX 양식으로 입력해주세요",
            },
          })}
          placeholder="핸드폰 번호를 입력해주세요"
        />
        {errors?.phoneNumber ? (
          <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>
        ) : null}

        <InputTitle>비밀번호</InputTitle>
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

        <InputTitle>비밀번호 확인</InputTitle>
        <LoginInput
          {...register("checkPw", {
            required: "비밀번호를 확인해주세요",
            minLength: {
              message: "4글자 이상 입력해주세요",
              value: 4,
            },
          })}
          placeholder="비밀번호를 입력해주세요"
        />
        {errors?.checkPw ? (
          <ErrorMessage>{errors.checkPw?.message}</ErrorMessage>
        ) : null}

        <LoginBtn>
          <JoinButton>회원가입</JoinButton>
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

const InputTitle = styled.p`
  font-size: ${FontSize.h3};
  text-align: left;
  padding-left: 3%;
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
