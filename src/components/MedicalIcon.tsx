/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Stethoscope,
  Activity,
  Baby,
  HeartPulse,
  FlaskConical,
  Syringe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle,
  Zap,
  Award,
  Sparkles,
  ShieldAlert,
  Calendar,
  User,
  ArrowRight,
  MessageSquare,
  Star,
  Plus,
  Compass,
  Check,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Heart,
  HelpCircle,
} from 'lucide-react';

interface MedicalIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function MedicalIcon({ name, className = '', size = 24 }: MedicalIconProps) {
  const icons: { [key: string]: React.ComponentType<{ className?: string; size?: number }> } = {
    Stethoscope,
    Activity,
    Baby,
    HeartPulse,
    FlaskConical,
    Syringe,
    Phone,
    Mail,
    MapPin,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    CheckCircle,
    Zap,
    Award,
    Sparkles,
    ShieldAlert,
    Calendar,
    User,
    ArrowRight,
    MessageSquare,
    Star,
    Plus,
    Compass,
    Check,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    Heart,
    HelpCircle
  };

  const SelectedIcon = icons[name] || Stethoscope;
  return <SelectedIcon className={className} size={size} />;
}
