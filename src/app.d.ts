/// <reference types="@auth/sveltekit" />
// TS.d.ts
import mongoose from 'mongoose';
import { NextFunction } from 'express';

declare global {
  namespace TS {
    type FingerprintData = {
      userAgent: string;
      screenResolution: string;
      timezone: string;
      webglVendor: string | undefined;
      webglRenderer: string | undefined;
      canvasFingerprint: string;
      localIPs: string[];
    };

    interface IUser extends mongoose.Document {
      _id: mongoose.Schema.Types.ObjectId;
      username: string;
      email: string;
      password: string;
      isVerified?: boolean;
      resetToken?: string;
      resetTokenExpiration?: Date;
      deleteToken?: string; // Ajout pour la suppression du compte
      deleteTokenExpiration?: Date; // Ajout pour la suppression du compte
      role?: 'user' | 'admin' | 'moderator';
      // ... autres méthodes et propriétés
    }

    interface Context {
      req: Request;
      res: Response;
      next: NextFunction;
      io: any;
    }

    interface SignupArgs {
      username: string;
      email: string;
      password: string;
    }

    interface LoginArgs {
      email: string;
      password: string;
      fingerPrint: FingerprintData;
    }

    interface TokenArgs {
      token: string;
    }

    interface GreetingInput {
      name: string;
      message: string;
    }

    interface LoginResponse {
      userId: string;
      role?: string;
      sessionId: string;
      userData: {
        username: string;
        email: string;
      };
    }

    interface GetDashboardDataResponse {
      role?: string;
      sessionId: string;
      isVerified?: boolean;
      userData: {
        username: string;
      };
    }

    interface Context {
      req: Request;
      res: Response;
      next: NextFunction;
      io: any;
    }

    interface ResetForgotNewPasswordArgs {
      token: string;
      newPassword: string;
      confirmPassword: string;
    }

    type Greeting = {
      id: string;
      name: string;
      message: string;
      _id?: string; // `_id` est optionnel, utilisé principalement pour le mapping initial.
    };

    interface Session {
      sessionId: string;
      device: string; // Exemple: 'Desktop - Chrome'
      lastActive: Date;
    }

    type FingerprintData = {
      userAgent: string;
      screenResolution: string;
      timezone: string;
      webglVendor: string | undefined;
      webglRenderer: string | undefined;
      canvasFingerprint: string;
      localIPs: string[];
    };

    interface userData {
      username: string | null;
    }

    interface IAuthStore {
      role: string | null;
      isAuthenticated: boolean;
      currentSessionId?: string; // L'identifiant de la session actuelle
    }

    interface UserInfo {
      name: string;
      email: string;
    }

    interface User {
      _id: string;
      username: string;
      email: string;
      role: string;
    }

    interface GetDashboardData {
      role: string;
      sessionId: string;
      isVerified: boolean;
      userData: {
        username: string;
        email: string;
      };
    }

    interface AnimationOptions {
      x?: number;
      y?: number;
      duration: number;
      delay?: number;
    }

    interface Notification {
      id: number;
      message: string;
      type: string; // ou enum si vous avez des types spécifiques
    }

    interface ApiCallOptions {
      url: string;
      method?: string;
      headers?: Headers | Record<string, string> | null;
      body?: Record<string, any> | null;
      credentials?: RequestCredentials | null;
      handleSuccess?: ((data: any) => void) | null;
      handleError?: ((error: any) => void) | null;
    }

    type TranslationFunction = (key: string, options?: any) => string;
  }

  namespace Express {
    interface Request {
      user?: TS.IUser;
    }
  }

  namespace Express {
    interface Request {
      apolloContext?: {
        next: NextFunction;
      };
    }
  }
}
export {};
