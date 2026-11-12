"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import { createOrder, getBasket } from "@/services/basketApi";
import { dayDiff, formatPrice, toFaDigits } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(3, "نام کامل را وارد کنید"),
  nationalCode: z.string().regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
  gender: z.enum(["male", "female"], { required_error: "جنسیت را انتخاب کنید" }),
  birthDate: z.string().min(1, "تاریخ تولد را وارد کنید"),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <CheckoutForm />
    </AuthGuard>
  );
}

function CheckoutForm() {
  const router = useRouter();
  const { data: basket, isLoading } = useQuery({
    queryKey: ["basket"],
    queryFn: getBasket,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (res) => {
      toast.success(res.message || "خرید با موفقیت انجام شد");
      router.push("/profile/tours");
    },
    onError: (err) => {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message : null;
      toast.error(msg || "خرید انجام نشد");
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <ThreeDots color="#28A745" height={50} width={70} />
      </div>
    );
  }

  const nights =
    basket?.startDate && basket?.endDate
      ? Math.max(0, dayDiff(String(basket.startDate), String(basket.endDate)) - 1)
      : 0;
  const days =
    basket?.startDate && basket?.endDate
      ? dayDiff(String(basket.startDate), String(basket.endDate))
      : 0;

  const submit = handleSubmit((v) => mutation.mutate(v));

  return (
    <div className="torino-checkout">
      <div className="torino-page torino-gutter">
        <div className="torino-checkout__grid">
          <form onSubmit={submit} className="torino-checkout__form">
            <div className="torino-checkout__form-head">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/user.svg" alt="" />
              <h1>مشخصات مسافر</h1>
            </div>

            <div className="torino-checkout__fields">
              <label className="torino-field">
                <input
                  {...register("fullName")}
                  placeholder="نام و نام خانوادگی"
                />
                {errors.fullName && (
                  <span className="torino-field__err">{errors.fullName.message}</span>
                )}
              </label>

              <label className="torino-field">
                <input
                  {...register("nationalCode")}
                  placeholder="کدملی"
                />
                {errors.nationalCode && (
                  <span className="torino-field__err">
                    {errors.nationalCode.message}
                  </span>
                )}
              </label>

              <label className="torino-field torino-field--date">
                <input
                  type="date"
                  {...register("birthDate")}
                  placeholder="تاریخ تولد"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/icons/calendar.svg" alt="" />
                {errors.birthDate && (
                  <span className="torino-field__err">{errors.birthDate.message}</span>
                )}
              </label>

              <label className="torino-field torino-field--gender">
                <select {...register("gender")} defaultValue="male">
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
                {errors.gender && (
                  <span className="torino-field__err">{errors.gender.message}</span>
                )}
              </label>
            </div>
          </form>

          <aside className="torino-checkout__summary">
            <h2 className="torino-checkout__summary-title">
              {String(basket?.title || "تور انتخاب‌شده")}
            </h2>
            {days > 0 && (
              <p className="torino-checkout__summary-days">
                {toFaDigits(days)} روز و {toFaDigits(nights)} شب
              </p>
            )}
            <div className="torino-checkout__dash" />
            <div className="torino-checkout__final">
              <span>قیمت نهایی</span>
              <strong>
                {typeof basket?.price === "number"
                  ? formatPrice(basket.price)
                  : "—"}
                <span>تومان</span>
              </strong>
            </div>
            <button
              type="button"
              onClick={submit}
              disabled={mutation.isPending || !basket?.title}
              className="torino-checkout__pay disabled:opacity-60"
            >
              {mutation.isPending ? (
                <ThreeDots height="28" width="50" color="#fff" />
              ) : (
                "ثبت و خرید نهایی"
              )}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
