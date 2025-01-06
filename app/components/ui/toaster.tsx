import type React from "react";

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";

interface ToasterProps
	extends React.ComponentPropsWithoutRef<typeof ToastProvider> {
	slotProps?: {
		viewport?: React.ComponentPropsWithoutRef<typeof ToastViewport>;
	};
}

export function Toaster({ slotProps = {}, ...otherProps }: ToasterProps) {
	const { toasts } = useToast();

	return (
		<ToastProvider {...otherProps}>
			{toasts.map(({ id, title, description, action, ...props }) => (
				<Toast key={id} {...props}>
					<div className="grid gap-1">
						{title && <ToastTitle>{title}</ToastTitle>}
						{description && <ToastDescription>{description}</ToastDescription>}
					</div>
					{action}
					<ToastClose />
				</Toast>
			))}
			<ToastViewport {...(slotProps.viewport ?? {})} />
		</ToastProvider>
	);
}
