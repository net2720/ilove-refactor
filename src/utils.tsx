import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import styled from "styled-components";
import { FontSize } from "./constants/FontSize";
import { BorderRadius, BorderColor } from "./constants/Border";
import { JoinButton } from "./components/BasicButton";
import { Post } from "./pages/Post";
import { instance } from "./services/Fetcher";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
  pw: string;
  checkPw?: string;
  name?: string;
  phoneNumber?: string;
}

export const LoginValidated = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<IFormInput>({
    email: "",
    pw: "",
  });

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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await instance.post("users/login", {
        email: data.email,
        password: data.pw,
      });
      console.log(response);

      const role = response.data.data.role;
      const token = response.data.data.token;

      console.log("role", role);
      console.log("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    handleSubmit(onSubmit);
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
          <JoinButton onClick={handleLogin}>로그인</JoinButton>
        </LoginBtn>
      </LoginForm>
    </>
  );
};

export const SignUpValidated = () => {
  const navigate = useNavigate();
  const [addr1, setAddr1] = useState<string>(""); // 시,도 주소
  const [addr2, setAddr2] = useState<string>(""); // 상세주소
  const [lat, setLat] = useState<number | null>(0); // 위도
  const [lng, setLng] = useState<number | null>(0); // 경도
  const [fullAddress, setFullAddress] = useState<string>(""); //전체주소
  const [registerData, setRegisterData] = useState<IFormInput>({
    email: "",
    pw: "",
    name: "",
    phoneNumber: "",
    checkPw: "",
  });

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
    setRegisterData(data);
    if (data.pw !== data.checkPw) {
      setError(
        "checkPw",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
  };

  const getAddrData = (
    addr1: string,
    addr2: string,
    lat: number | null,
    lng: number | null,
    fullAddress: string
  ): void => {
    setAddr1(addr1);
    setAddr2(addr2);
    setLat(lat);
    setLng(lng);
    setFullAddress(fullAddress);
  };

  const handleSignUp = async () => {
    try {
      await instance.post("/users/clientsignup", {
        email: registerData.email,
        name: registerData.name,
        phoneNumber: registerData.phoneNumber,
        password: registerData.pw,
        addr1: addr1,
        addr2: addr2,
        lat: lat,
        lng: lng,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
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

        <Post getAddrData={getAddrData} />
        <LoginBtn>
          <JoinButton onClick={handleSignUp}>회원가입</JoinButton>
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

export const InputTitle = styled.p`
  font-size: ${FontSize.h3};
  text-align: left;
  padding-left: 3%;
`;

export const LoginInput = styled.input.attrs((props) => ({
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
