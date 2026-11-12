"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { getProfile, updateProfile } from "@/services/userApi";
import { useAuthStore } from "@/store/authStore";
import { formatPhone, toFaDigits } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(2, "نام را وارد کنید"),
  lastName: z.string().min(2, "نام خانوادگی را وارد کنید"),
  email: z.string().email("ایمیل معتبر نیست").or(z.literal("")).optional(),
  gender: z.enum(["male", "female"]),
  birthDate: z.string().optional(),
  nationalCode: z.string().optional(),
  debitCard_code: z
    .string()
    .regex(/^(\d{16})?$/, "شماره کارت باید ۱۶ رقم باشد")
    .optional(),
  shaba_code: z.string().optional(),
  accountIdentifier: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;
type EditSection = null | "account" | "personal" | "bank";

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const [editing, setEditing] = useState<EditSection>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!data) return;
    reset({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      gender: data.gender || "male",
      birthDate: data.birthDate ? data.birthDate.slice(0, 10) : "",
      nationalCode: data.nationalCode || "",
      debitCard_code: data.payment?.debitCard_code || "",
      shaba_code: data.payment?.shaba_code || "",
      accountIdentifier: data.payment?.accountIdentifier || "",
    });
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      toast.success(res.message || "اطلاعات ذخیره شد");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setEditing(null);
      if (res.user) {
        setUser({
          id: res.user.id,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          mobile: res.user.mobile,
        });
      }
    },
    onError: (err) => {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message : null;
      toast.error(msg || "ذخیره اطلاعات ناموفق بود");
    },
  });

  const save = handleSubmit((values) => {
    mutation.mutate({
      mobile: data?.mobile,
      email: values.email || undefined,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      birthDate: values.birthDate || undefined,
      nationalCode: values.nationalCode || undefined,
      payment: {
        debitCard_code: values.debitCard_code || "",
        shaba_code: values.shaba_code || "",
        accountIdentifier: values.accountIdentifier || "",
      },
    });
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <ThreeDots color="#28A745" height={50} width={70} />
      </div>
    );
  }

  const fullName =
    [data?.firstName, data?.lastName].filter(Boolean).join(" ") || "—";

  return (
    <div>
      <section className="torino-profile-card">
        <div className="torino-profile-card__head">
          <h2>اطلاعات حساب کاربری</h2>
          {editing !== "account" && (
            <button
              type="button"
              onClick={() => setEditing("account")}
              className="torino-profile-edit"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/pencil.svg" alt="" />
              افزودن
            </button>
          )}
        </div>

        {editing === "account" ? (
          <div className="torino-profile-account-edit">
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">شماره موبایل</span>
              <span className="torino-profile-row__value torino-num" dir="ltr">
                {formatPhone(data?.mobile)}
              </span>
            </p>
            <div className="torino-profile-account-edit__email">
              <label className="torino-field">
                <input
                  {...register("email")}
                  placeholder="آدرس ایمیل"
                />
                {errors.email && (
                  <span className="torino-field__err">{errors.email.message}</span>
                )}
              </label>
              <button
                type="button"
                onClick={save}
                className="torino-btn-primary shrink-0"
              >
                {mutation.isPending ? "..." : "تایید"}
              </button>
            </div>
          </div>
        ) : (
          <div className="torino-profile-rows">
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">شماره موبایل:</span>
              <span className="torino-profile-row__value torino-num" dir="ltr">
                {formatPhone(data?.mobile)}
              </span>
            </p>
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">ایمیل:</span>
              <span
                className="torino-profile-row__value torino-num"
                dir={data?.email ? "ltr" : undefined}
              >
                {data?.email || "—"}
              </span>
            </p>
          </div>
        )}
      </section>

      <section className="torino-profile-card">
        <div className="torino-profile-card__head">
          <h2>اطلاعات شخصی</h2>
          {editing !== "personal" && (
            <button
              type="button"
              onClick={() => setEditing("personal")}
              className="torino-profile-edit"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/pencil.svg" alt="" />
              ویرایش اطلاعات
            </button>
          )}
        </div>

        {editing === "personal" ? (
          <div>
            <div className="torino-checkout__fields !grid-cols-1 md:!grid-cols-3">
              <label className="torino-field md:col-span-1">
                <input
                  {...register("firstName")}
                  placeholder="نام و نام خانوادگی"
                />
              </label>
              <label className="torino-field">
                <input
                  {...register("lastName")}
                  placeholder="نام خانوادگی"
                />
              </label>
              <label className="torino-field">
                <input
                  {...register("nationalCode")}
                  placeholder="کد ملی"
                />
              </label>
              <label className="torino-field torino-field--date">
                <input type="date" {...register("birthDate")} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/icons/calendar.svg" alt="" />
              </label>
              <label className="torino-field torino-field--gender">
                <select {...register("gender")}>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
              </label>
            </div>
            <div className="torino-profile-actions">
              <button type="button" onClick={save} className="torino-btn-primary">
                {mutation.isPending ? "..." : "تایید"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="torino-btn-ghost"
              >
                انصراف
              </button>
            </div>
          </div>
        ) : (
          <div className="torino-profile-rows">
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">نام و نام خانوادگی:</span>
              <span className="torino-profile-row__value">{fullName}</span>
            </p>
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">کد ملی:</span>
              <span className="torino-profile-row__value torino-num" dir="ltr">
                {data?.nationalCode ? toFaDigits(data.nationalCode) : "—"}
              </span>
            </p>
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">جنسیت:</span>
              <span className="torino-profile-row__value">
                {data?.gender === "female"
                  ? "زن"
                  : data?.gender === "male"
                    ? "مرد"
                    : "—"}
              </span>
            </p>
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">تاریخ تولد:</span>
              <span className="torino-profile-row__value torino-num" dir="ltr">
                {data?.birthDate
                  ? toFaDigits(
                      new Date(data.birthDate).toLocaleDateString("fa-IR"),
                    )
                  : "—"}
              </span>
            </p>
          </div>
        )}
      </section>

      <section className="torino-profile-card">
        <div className="torino-profile-card__head">
          <h2>اطلاعات حساب بانکی</h2>
          {editing !== "bank" && (
            <button
              type="button"
              onClick={() => setEditing("bank")}
              className="torino-profile-edit"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/pencil.svg" alt="" />
              ویرایش اطلاعات
            </button>
          )}
        </div>

        {editing === "bank" ? (
          <div>
            <div className="torino-checkout__fields !grid-cols-1 md:!grid-cols-3">
              <label className="torino-field">
                <input
                  {...register("shaba_code")}
                  placeholder="شماره شبا"
                />
              </label>
              <label className="torino-field">
                <input
                  {...register("debitCard_code")}
                  placeholder="شماره کارت"
                />
                {errors.debitCard_code && (
                  <span className="torino-field__err">
                    {errors.debitCard_code.message}
                  </span>
                )}
              </label>
              <label className="torino-field">
                <input
                  {...register("accountIdentifier")}
                  placeholder="شماره حساب"
                />
              </label>
            </div>
            <div className="torino-profile-actions">
              <button type="button" onClick={save} className="torino-btn-primary">
                {mutation.isPending ? "..." : "تایید"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="torino-btn-ghost"
              >
                انصراف
              </button>
            </div>
          </div>
        ) : (
          <div className="torino-profile-rows">
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">شماره شبا:</span>
              <span className="torino-profile-row__value torino-num" dir="ltr">
                {data?.payment?.shaba_code
                  ? toFaDigits(data.payment.shaba_code)
                  : "—"}
              </span>
            </p>
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">شماره کارت:</span>
              <span className="torino-profile-row__value torino-num" dir="ltr">
                {data?.payment?.debitCard_code
                  ? toFaDigits(data.payment.debitCard_code)
                  : "—"}
              </span>
            </p>
            <p className="torino-profile-row">
              <span className="torino-profile-row__label">شماره حساب:</span>
              <span className="torino-profile-row__value torino-num" dir="ltr">
                {data?.payment?.accountIdentifier
                  ? toFaDigits(data.payment.accountIdentifier)
                  : "—"}
              </span>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
