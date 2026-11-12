"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OtpInput from "react18-input-otp";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useAuthStore } from "@/store/authStore";
import { checkOtp, sendOtp } from "@/services/authApi";
import { setTokens } from "@/lib/cookies";
import { formatPhone } from "@/lib/utils";
import axios from "axios";

const mobileSchema = z.object({
  mobile: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر وارد کنید (مثال: 09123456789)"),
});

type MobileForm = z.infer<typeof mobileSchema>;

export default function LoginModal() {
  const { loginOpen, closeLogin, setUser } = useAuthStore();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MobileForm>({
    resolver: zodResolver(mobileSchema),
  });

  if (!loginOpen) return null;

  const resetAll = () => {
    setStep("mobile");
    setMobile("");
    setOtp("");
    setDevCode(null);
    reset();
  };

  const onClose = () => {
    resetAll();
    closeLogin();
  };

  const onSend = async (values: MobileForm) => {
    setLoading(true);
    try {
      const res = await sendOtp(values.mobile);
      setMobile(values.mobile);
      setStep("otp");
      if (res.code) setDevCode(res.code);
      toast.success(res.message || "کد ارسال شد");
    } catch (err) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message : null;
      toast.error(msg || "خطا در ارسال کد");
    } finally {
      setLoading(false);
    }
  };

  const onVerify = async () => {
    if (otp.length < 6) {
      toast.error("کد ۶ رقمی را کامل وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const res = await checkOtp(mobile, otp);
      setTokens(res.accessToken, res.refreshToken);
      setUser(res.user);
      toast.success("ورود موفق");
      onClose();
    } catch (err) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message : null;
      toast.error(msg || "کد نامعتبر است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-[561px] rounded-[20px] bg-white px-8 pb-10 pt-12 shadow-[0_4px_40px_rgba(0,0,0,0.12)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-5 top-5 text-[28px] leading-none text-[#282828]/70"
          aria-label="بستن"
        >
          ×
        </button>

        <div className="mb-8 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Torino"
            width={164}
            height={50}
            className="torino-logo !object-center"
          />
        </div>

        {step === "mobile" ? (
          <form onSubmit={handleSubmit(onSend)} className="space-y-5">
            <p className="text-center text-[28px] font-semibold text-[#282828]">
              ورود به تورینو
            </p>
            <p className="text-center text-base text-[#282828]/80">
              شماره موبایل خود را وارد کنید
            </p>
            <input
              {...register("mobile")}
              dir="ltr"
              placeholder="0912xxxxxxx"
              className="h-[52px] w-full rounded-[12px] border border-black/15 px-4 text-left text-base outline-none focus:border-[#28A745]"
            />
            {errors.mobile && (
              <p className="text-sm text-danger">{errors.mobile.message}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[#28A745] text-lg text-white disabled:opacity-70"
            >
              {loading ? <ThreeDots height="28" width="50" color="#fff" /> : "ارسال کد تایید"}
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <p className="text-center text-[28px] font-semibold text-[#282828]">
              کد تایید را وارد کنید
            </p>
            <p className="text-center text-base text-[#282828]/80">
              کد تایید به{" "}
              <span className="torino-num" dir="ltr">
                {formatPhone(mobile)}
              </span>{" "}
              ارسال شد
            </p>
            {devCode && (
              <p className="rounded-xl bg-[#e8f7ec] px-3 py-2 text-center text-sm text-[#28A745]">
                کد تست: {devCode}
              </p>
            )}
            <div className="otp-box flex justify-center" dir="ltr">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<span className="w-2" />}
                isInputNum
              />
            </div>
            <button
              type="button"
              onClick={onVerify}
              disabled={loading}
              className="flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[#28A745] text-lg text-white disabled:opacity-70"
            >
              {loading ? <ThreeDots height="28" width="50" color="#fff" /> : "ورود به تورینو"}
            </button>
            <button
              type="button"
              className="w-full text-base text-[#28A745]"
              onClick={() => setStep("mobile")}
            >
              ویرایش شماره موبایل
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
