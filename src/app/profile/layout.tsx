import AuthGuard from "@/components/auth/AuthGuard";
import ProfileNav from "@/components/profile/ProfileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="torino-profile">
        <div className="torino-page torino-gutter">
          <div className="torino-profile__grid">
            <ProfileNav />
            <div>{children}</div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
