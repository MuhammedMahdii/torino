"use client";

import { useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";
import { getUserTransactions } from "@/services/userApi";
import { formatPrice, toFaDigits } from "@/lib/utils";

function transactionTypeLabel(type?: string) {
  if (!type) return "ثبت نام در تور گردشگری";
  const key = type.trim().toLowerCase();
  const map: Record<string, string> = {
    purchase: "ثبت نام در تور گردشگری",
    perches: "ثبت نام در تور گردشگری",
    buy: "ثبت نام در تور گردشگری",
  };
  return map[key] || type;
}

function formatTxDate(raw?: string) {
  if (!raw) return "—";
  return toFaDigits(
    `${new Date(raw).toLocaleDateString("fa-IR")} - ${new Date(
      raw,
    ).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
  );
}

function formatOrderId(id: string) {
  return toFaDigits(String(id).replace(/\D/g, "").slice(0, 8) || id.slice(0, 8));
}

export default function TransactionsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getUserTransactions,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <ThreeDots color="#28A745" height={50} width={70} />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-xl bg-red-50 p-4 text-danger">
        خطا در دریافت تراکنش‌ها
      </p>
    );
  }

  return (
    <div className="torino-profile-card overflow-hidden !p-0">
      {!data?.length && (
        <p className="px-4 py-10 text-center text-[15px] text-[rgba(40,40,40,0.6)]">
          تراکنشی ثبت نشده است.
        </p>
      )}

      {!!data?.length && (
        <>
          <div className="torino-tx-cards">
            {data.map((tx) => {
              const raw = tx.created_at || tx.createdAt || tx.date;
              return (
                <article key={tx.id} className="torino-tx-card">
                  <div className="torino-tx-card__row">
                    <span>تاریخ و ساعت</span>
                    <strong className="torino-num" dir="ltr">
                      {formatTxDate(raw)}
                    </strong>
                  </div>
                  <div className="torino-tx-card__row">
                    <span>مبلغ (تومان)</span>
                    <strong className="torino-num" dir="ltr">
                      {formatPrice(tx.amount)}
                    </strong>
                  </div>
                  <div className="torino-tx-card__row">
                    <span>نوع تراکنش</span>
                    <strong>{transactionTypeLabel(tx.type)}</strong>
                  </div>
                  <div className="torino-tx-card__row">
                    <span>شماره سفارش</span>
                    <strong>
                      سفارش{" "}
                      <span className="torino-num" dir="ltr">
                        {formatOrderId(tx.id)}
                      </span>
                    </strong>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="torino-tx-table-wrap">
            <table className="torino-tx-table">
              <thead>
                <tr>
                  <th>تاریخ و ساعت</th>
                  <th>مبلغ(تومان)</th>
                  <th>نوع تراکنش</th>
                  <th>شماره سفارش</th>
                </tr>
              </thead>
              <tbody>
                {data.map((tx) => {
                  const raw = tx.created_at || tx.createdAt || tx.date;
                  return (
                    <tr key={tx.id}>
                      <td>
                        <span className="torino-num" dir="ltr">
                          {formatTxDate(raw)}
                        </span>
                      </td>
                      <td>
                        <span className="torino-num" dir="ltr">
                          {formatPrice(tx.amount)}
                        </span>
                      </td>
                      <td>{transactionTypeLabel(tx.type)}</td>
                      <td>
                        سفارش{" "}
                        <span className="torino-num" dir="ltr">
                          {formatOrderId(tx.id)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
