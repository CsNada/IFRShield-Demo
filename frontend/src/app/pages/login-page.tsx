import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ShieldCheck } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[#0f172a] rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl text-[#0f172a] mb-1">AuditReady AI</h1>
            <p className="text-sm text-slate-600">Enterprise Audit Intelligence Platform</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <Button type="submit" className="w-full h-11 bg-[#0f172a] hover:bg-[#1e293b]">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-slate-600 hover:text-[#0f172a]">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p>Trusted by leading financial institutions worldwide</p>
        </div>
      </div>
    </div>
  );
}
