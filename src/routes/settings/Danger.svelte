<script lang="ts">
    // Assuming these are available from your SvelteKit setup or similar
    // For standalone testing, you might need to mock these or remove them if not used.
    // import { isLoggedIn } from '$stores/session'; // Uncomment if you have this store
    // import { goto } from '$app/navigation'; // Uncomment if you have this navigation helper

    // Mocking for demonstration if not in a SvelteKit environment
    let isLoggedIn = false; // Mock isLoggedIn for demonstration
    const goto = (path: string) => { console.log(`Navigating to: ${path}`); }; // Mock goto for demonstration

    // --- Modal State Management ---
    let showConfirmationModal = false;
    let showSuccessModal = false;
    let confirmationInput = ''; // To store the user's typed confirmation for deletion

    /**
     * Handles the submission of the delete account form.
     * Shows a custom confirmation modal instead of a browser prompt.
     */
    function handleDeleteAccountSubmit(event: Event) {
        event.preventDefault();
        showConfirmationModal = true; // Show the custom confirmation modal
    }

    /**
     * Called when the user confirms the deletion in the custom modal.
     */
    function confirmAccountDeletion() {
        // Normalize the input for comparison
        const normalizedInput = confirmationInput.toLocaleLowerCase().replaceAll(' ', '').replaceAll('!', '').replaceAll(',', '');

        if (normalizedInput === 'pleasejustdoitserver') {
            // Proceed with account deletion logic (FAKE LOGIC for this example)
            console.log("Account deletion initiated.");
            // In a real app, you'd make an API call here.
            // On success:
            showConfirmationModal = false; // Hide confirmation
            showSuccessModal = true;     // Show success message
            // Reset input for next time
            confirmationInput = '';
        } else {
            // If confirmation text doesn't match, provide feedback (e.g., via another modal or message)
            // Using alert for simplicity here, but ideally another modal or inline message would be better
            alert("Confirmation text did not match. Account not deleted.");
            showConfirmationModal = false;
            confirmationInput = '';
        }
    }

    /**
     * Called when the user cancels the deletion in the custom modal.
     */
    function cancelAccountDeletion() {
        showConfirmationModal = false;
        confirmationInput = ''; // Clear input on cancel
        console.log("Account deletion cancelled by user.");
    }

    /**
     * Called when the success modal is closed.
     */
    function closeSuccessModal() {
        showSuccessModal = false;
        // After successful deletion and closing modal, update login status and navigate
        isLoggedIn = false; // Update your session store
        goto('/'); // Navigate to home page or login page
    }

    // --- Inline Modal Component ---
    // This is a basic modal component. For more complex apps, you might put this in its own file.
    // It's kept here for self-containation as requested.
    interface ModalProps {
        message: string;
        isPrompt?: boolean;
        promptPlaceholder?: string;
        confirmText?: string;
        cancelText?: string;
        onConfirm: (inputValue?: string) => void; // Added inputValue parameter
        onCancel?: () => void;
    }

    function Modal(props: ModalProps) {
        let inputValue = ''; // Internal state for prompt input

        // Reactive statement to reset inputValue when modal opens as a prompt
        $: if (props.isPrompt && showConfirmationModal) inputValue = '';

        return `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
                    <p class="text-lg font-semibold mb-4 text-text dark:text-text-dark">${props.message}</p>
                    ${props.isPrompt ? `
                        <input
                            type="text"
                            placeholder="${props.promptPlaceholder || ''}"
                            class="w-full p-3 mb-4 rounded-md border border-border dark:border-border-dark bg-white dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-200"
                            bind:value={inputValue}
                        />
                    ` : ''}
                    <div class="flex justify-end gap-3">
                        ${props.onCancel ? `
                            <button
                                class="px-5 py-2 rounded-md font-semibold border border-border dark:border-border-dark text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                                on:click={props.onCancel}
                            >
                                ${props.cancelText || 'Cancel'}
                            </button>
                        ` : ''}
                        <button
                            class="px-5 py-2 rounded-md font-semibold bg-accent text-white hover:bg-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-200"
                            on:click={() => props.onConfirm(inputValue)}
                        >
                            ${props.confirmText || 'Confirm'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
</script>

<!-- Main content container - removed outer padding, background, shadow, border -->
<div class="flex flex-col gap-8 mx-auto text-text dark:text-text-dark font-sans">

    <!-- Change Username Section -->
    <section>
        <h3 class="text-2xl font-bold mb-4">Change Username</h3>
        <p class="mb-4 text-sm">Your old username will redirect to your new username until it is taken by someone else.</p>
        <!-- Form - removed inner padding, border, background, shadow -->
        <form method="POST" class="flex flex-col gap-4 mt-6">
            <input
                type="text"
                name="username"
                placeholder="New Username"
                required
                class="p-3 rounded-md border border-border dark:border-border-dark bg-white dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-200"
            >
            <button
                type="submit"
                class="bg-accent text-white py-3 px-6 rounded-md font-semibold hover:bg-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-200 shadow-md"
            >
                Change Username
            </button>
        </form>
    </section>

    <!-- Delete Account Section -->
    <section>
        <h3 class="text-2xl font-bold mb-4">Delete Account</h3>
        <strong class="block mb-2 text-red-600 dark:text-red-400">This will PERMANENTLY delete your account, including your profile, your projects, and any other data.
            Note that moderators can still see your account and other data. If you are requesting deletion for privacy
            reasons, please contact us at [TODO: fill this in].
        </strong>
        <p class="mb-4 text-sm">To delete your account, please enter your password:</p>
        <!-- Form - removed inner padding, border, background, shadow -->
        <form method="POST" on:submit={handleDeleteAccountSubmit} class="flex flex-col gap-4 mt-6">
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                class="p-3 rounded-md border border-border dark:border-border-dark bg-white dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-200"
            >
            <button
                type="submit"
                class="bg-red-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-200 shadow-md"
            >
                Delete Account
            </button>
        </form>
    </section>
</div>

<!-- Custom Confirmation Modal -->
{#if showConfirmationModal}
    <Modal
        message="Please remember - if you proceed to delete your account, it will be permanently deleted. All projects and other data will be inaccessible. Are you REALLY, REALLY sure? Please type the following: 'Please just do it, server!' to confirm."
        isPrompt={true}
        promptPlaceholder="Type 'Please just do it, server!'"
        confirmText="Confirm Deletion"
        cancelText="Cancel"
        onConfirm={(inputValue) => { confirmationInput = inputValue || ''; confirmAccountDeletion(); }}
        onCancel={cancelAccountDeletion}
    />
{/if}

<!-- Custom Success Modal -->
{#if showSuccessModal}
    <Modal
        message="Account deletion complete. Carry on with your day."
        confirmText="OK"
        onConfirm={closeSuccessModal}
    />
{/if}

<style lang="postcss">
    /*
     * IMPORTANT: For `bg-accent`, `text-text`, `border-border`, etc., to work,
     * your Tailwind CSS configuration (e.g., tailwind.config.ts or .js)
     * must explicitly map these custom properties to named colors
     * in its `theme.extend.colors` section.
     *
     * Example:
     * module.exports = {
     * theme: {
     * extend: {
     * colors: {
     * accent: 'var(--color-accent)',
     * 'accent-secondary': 'var(--color-accent-secondary)',
     * text: 'var(--color-text)',
     * 'text-dark': 'var(--color-text-dark)',
     * border: 'var(--color-border)',
     * 'border-dark': 'var(--color-border-dark)',
     * background: 'var(--color-background)',
     * 'background-dark': 'var(--color-background-dark)',
     * },
     * },
     * },
     * };
     */
</style>
