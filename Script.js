// Add event listeners to buy buttons
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Get product price
        const price = parseInt(button.parentElement.querySelector('p').textContent.replace('₦', ''))

        // Check balance (assuming balance is stored in localStorage)
        const balance = parseInt(localStorage.getItem('balance')) || 0
        if (balance >= price) {
            // Update balance
            localStorage.setItem('balance', balance - price)

            // Add product to purchased products
            const purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || []
            purchasedProducts.push({
                name: button.parentElement.querySelector('img').alt,
                price: price
            })
            localStorage.setItem('purchasedProducts', JSON.stringify(purchasedProducts))

            alert('Purchase successful!')
        } else {
            alert('Insufficient balance!')
        }
    })
})

// Add event listeners to icons
document.querySelector('.products-icon').addEventListener('click', () => {
    // Show purchased products
    const purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || []
    let productsHTML = ''
    purchasedProducts.forEach(product => {
        productsHTML += `<p>${product.name} - ₦${product.price}</p>`
    })
    alert(productsHTML)
})

document.querySelector('.invite-icon').addEventListener('click', () => {
    // Show invite link
    const inviteLink = window.location.href
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard!')
})

document.querySelector('.mine-icon').addEventListener('click', () => {
    // Show mine page
    const balance = parseInt(localStorage.getItem('balance')) || 0
    const number = localStorage.getItem('number') || ''
    let mineHTML = `<p>Number: ${number}</p>`
    mineHTML += `<p>Balance: ₦${balance}</p>`
    mineHTML += `<button id="withdraw-btn">Withdraw</button>`
    mineHTML += `<button id="deposit-btn">Deposit</button>`
    mineHTML += `<button id="transaction-history-btn">Transaction History</button>`
    alert(mineHTML)

    // Add event listeners to buttons
    document.querySelector('#withdraw-btn').addEventListener('click', () => {
        // Show withdraw page
        let withdrawHTML = `<p>Minimum withdrawal: ₦500</p>`
        withdrawHTML += `<input type="number" id="withdraw-amount" placeholder="Amount">`
        withdrawHTML += `<input type="text" id="withdraw-account-number" placeholder="Account Number">`
        withdrawHTML += `<input type="text" id="withdraw-account-name" placeholder="Account Name">`
        withdrawHTML += `<button id="withdraw-confirm-btn">Confirm</button>`
        alert(withdrawHTML)
    })

    document.querySelector('#deposit-btn').addEventListener('click', () => {
        // Show deposit page
        let depositHTML = `<p>Account Number: 8100466042 (Opay)</p>`
        depositHTML += `<p>Minimum deposit: ₦1000</p>`
        depositHTML += `<input type="number" id="deposit-amount" placeholder="Amount">`
        depositHTML += `<button id="deposit-confirm-btn">Confirm</button>`
        alert(depositHTML)
    })

    document.querySelector('#transaction-history-btn').addEventListener('click', () => {
        // Show transaction history
        const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || []
        let transactionHistoryHTML = ''
        transactionHistory.forEach(transaction => {
            transactionHistoryHTML += `<p>${transaction.type} - ₦${transaction.amount}</p>`
        })
        alert(transactionHistoryHTML)
    })
})
