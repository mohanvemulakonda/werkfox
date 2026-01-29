-- CreateTable
CREATE TABLE `contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `company` VARCHAR(255) NULL,
    `message` TEXT NOT NULL,
    `labelFinderData` TEXT NULL,
    `source` VARCHAR(100) NULL DEFAULT 'contact_form',
    `ipAddress` VARCHAR(100) NULL,
    `userAgent` TEXT NULL,
    `status` ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'QUOTE_SENT', 'CONVERTED', 'LOST', 'SPAM') NOT NULL DEFAULT 'NEW',
    `assignedTo` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `convertedToLeadId` INTEGER NULL,

    UNIQUE INDEX `contacts_convertedToLeadId_key`(`convertedToLeadId`),
    INDEX `contacts_email_idx`(`email`),
    INDEX `contacts_status_idx`(`status`),
    INDEX `contacts_createdAt_idx`(`createdAt`),
    INDEX `contacts_convertedToLeadId_idx`(`convertedToLeadId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organizationId` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `company` VARCHAR(255) NULL,
    `designation` VARCHAR(255) NULL,
    `billingAddress` TEXT NULL,
    `shippingAddress` TEXT NULL,
    `city` VARCHAR(100) NULL,
    `state` VARCHAR(100) NULL,
    `country` VARCHAR(100) NULL DEFAULT 'India',
    `pincode` VARCHAR(20) NULL,
    `gstNumber` VARCHAR(50) NULL,
    `gstType` ENUM('REGISTERED', 'UNREGISTERED', 'COMPOSITION', 'SEZ', 'EXPORT') NULL DEFAULT 'UNREGISTERED',
    `source` VARCHAR(100) NULL,
    `industry` VARCHAR(100) NULL,
    `leadScore` INTEGER NULL DEFAULT 0,
    `stage` ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST') NOT NULL DEFAULT 'NEW',
    `status` ENUM('ACTIVE', 'INACTIVE', 'CONVERTED', 'DISQUALIFIED') NOT NULL DEFAULT 'ACTIVE',
    `assignedTo` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `nextFollowUp` DATETIME(3) NULL,
    `lastContacted` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `convertedAt` DATETIME(3) NULL,

    INDEX `leads_organizationId_idx`(`organizationId`),
    INDEX `leads_email_idx`(`email`),
    INDEX `leads_stage_idx`(`stage`),
    INDEX `leads_status_idx`(`status`),
    INDEX `leads_assignedTo_idx`(`assignedTo`),
    INDEX `leads_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opportunities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organizationId` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `leadId` INTEGER NOT NULL,
    `value` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `probability` INTEGER NULL DEFAULT 0,
    `expectedCloseDate` DATETIME(3) NULL,
    `actualCloseDate` DATETIME(3) NULL,
    `stage` ENUM('QUALIFICATION', 'NEEDS_ANALYSIS', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST') NOT NULL DEFAULT 'QUALIFICATION',
    `status` ENUM('OPEN', 'WON', 'LOST', 'ABANDONED') NOT NULL DEFAULT 'OPEN',
    `lostReason` TEXT NULL,
    `assignedTo` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `opportunities_organizationId_idx`(`organizationId`),
    INDEX `opportunities_leadId_idx`(`leadId`),
    INDEX `opportunities_stage_idx`(`stage`),
    INDEX `opportunities_status_idx`(`status`),
    INDEX `opportunities_assignedTo_idx`(`assignedTo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organizationId` INTEGER NULL,
    `sku` VARCHAR(100) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `category` ENUM('LABELS', 'RIBBONS', 'PRINTERS', 'SOFTWARE', 'SERVICES', 'SUPPLIES', 'ACCESSORIES') NULL,
    `basePrice` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `hsnCode` VARCHAR(50) NULL,
    `gstRate` DECIMAL(5, 2) NOT NULL DEFAULT 18.00,
    `unit` VARCHAR(50) NULL DEFAULT 'Nos',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `stockQuantity` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `connectivity` VARCHAR(255) NULL,
    `coreSize` VARCHAR(50) NULL,
    `features` TEXT NULL,
    `image` VARCHAR(500) NULL,
    `images` TEXT NULL,
    `labelAdhesive` VARCHAR(100) NULL,
    `labelFinish` VARCHAR(100) NULL,
    `labelMaterial` VARCHAR(100) NULL,
    `labelShape` VARCHAR(50) NULL,
    `labelSize` VARCHAR(100) NULL,
    `licensePeriod` VARCHAR(50) NULL,
    `licenseType` VARCHAR(100) NULL,
    `maxPrintWidth` VARCHAR(50) NULL,
    `maxUsers` INTEGER NULL,
    `metaDescription` TEXT NULL,
    `metaTitle` VARCHAR(255) NULL,
    `printMethod` VARCHAR(100) NULL,
    `printResolution` VARCHAR(50) NULL,
    `printSpeed` VARCHAR(50) NULL,
    `printTechnology` VARCHAR(100) NULL,
    `printerBrand` VARCHAR(100) NULL,
    `printerModel` VARCHAR(100) NULL,
    `printerType` VARCHAR(100) NULL,
    `reorderLevel` INTEGER NULL DEFAULT 10,
    `ribbonColor` VARCHAR(50) NULL,
    `ribbonLength` VARCHAR(50) NULL,
    `ribbonType` VARCHAR(100) NULL,
    `ribbonWidth` VARCHAR(50) NULL,
    `rollSize` VARCHAR(100) NULL,
    `serviceType` VARCHAR(100) NULL,
    `specifications` TEXT NULL,
    `subCategory` VARCHAR(100) NULL,
    `tags` TEXT NULL,

    UNIQUE INDEX `products_sku_key`(`sku`),
    INDEX `products_organizationId_idx`(`organizationId`),
    INDEX `products_sku_idx`(`sku`),
    INDEX `products_category_idx`(`category`),
    INDEX `products_isActive_idx`(`isActive`),
    INDEX `products_printerBrand_idx`(`printerBrand`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opportunity_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `opportunityId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` DECIMAL(10, 2) NOT NULL,
    `unitPrice` DECIMAL(10, 2) NOT NULL,
    `discount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,

    INDEX `opportunity_products_opportunityId_idx`(`opportunityId`),
    INDEX `opportunity_products_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `source` VARCHAR(100) NULL,
    `subscribedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `unsubscribedAt` DATETIME(3) NULL,

    UNIQUE INDEX `subscribers_email_key`(`email`),
    INDEX `subscribers_email_idx`(`email`),
    INDEX `subscribers_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `downloads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `company` VARCHAR(255) NULL,
    `resourceType` VARCHAR(100) NOT NULL,
    `resourceName` VARCHAR(255) NOT NULL,
    `resourcePath` VARCHAR(500) NOT NULL,
    `ipAddress` VARCHAR(100) NULL,
    `userAgent` TEXT NULL,
    `downloadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `downloads_email_idx`(`email`),
    INDEX `downloads_resourceType_idx`(`resourceType`),
    INDEX `downloads_downloadedAt_idx`(`downloadedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quote_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organizationId` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `company` VARCHAR(255) NULL,
    `productName` VARCHAR(255) NULL,
    `quantity` INTEGER NULL,
    `specifications` TEXT NULL,
    `estimatedValue` DECIMAL(10, 2) NULL,
    `currency` VARCHAR(10) NULL DEFAULT 'INR',
    `status` ENUM('PENDING', 'IN_PROGRESS', 'SENT', 'ACCEPTED', 'DECLINED') NOT NULL DEFAULT 'PENDING',
    `assignedTo` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `quote_requests_organizationId_idx`(`organizationId`),
    INDEX `quote_requests_email_idx`(`email`),
    INDEX `quote_requests_status_idx`(`status`),
    INDEX `quote_requests_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_views` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(500) NOT NULL,
    `title` VARCHAR(255) NULL,
    `ipAddress` VARCHAR(100) NULL,
    `userAgent` TEXT NULL,
    `referrer` VARCHAR(500) NULL,
    `viewedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `page_views_path_idx`(`path`),
    INDEX `page_views_viewedAt_idx`(`viewedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'SALES', 'MARKETING', 'SUPPORT', 'FINANCE', 'VIEWER') NOT NULL DEFAULT 'SALES',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastLogin` DATETIME(3) NULL,
    `avatar` VARCHAR(500) NULL,
    `canApproveInvoices` BOOLEAN NOT NULL DEFAULT false,
    `canCreateInvoices` BOOLEAN NOT NULL DEFAULT true,
    `canCreateLeads` BOOLEAN NOT NULL DEFAULT true,
    `canDeleteLeads` BOOLEAN NOT NULL DEFAULT false,
    `canEditLeads` BOOLEAN NOT NULL DEFAULT true,
    `canViewAllLeads` BOOLEAN NOT NULL DEFAULT false,
    `department` VARCHAR(100) NULL,
    `designation` VARCHAR(100) NULL,
    `managerId` INTEGER NULL,
    `monthlyTarget` DECIMAL(12, 2) NULL,
    `phone` VARCHAR(50) NULL,
    `quarterlyTarget` DECIMAL(12, 2) NULL,

    UNIQUE INDEX `admin_users_email_key`(`email`),
    INDEX `admin_users_email_idx`(`email`),
    INDEX `admin_users_role_idx`(`role`),
    INDEX `admin_users_isActive_idx`(`isActive`),
    INDEX `admin_users_managerId_idx`(`managerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `packageType` ENUM('CRM_ONLY', 'ERP_ONLY', 'FULL_SUITE') NOT NULL DEFAULT 'FULL_SUITE',
    `billingInfo` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `organizations_slug_key`(`slug`),
    INDEX `organizations_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organization_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organizationId` INTEGER NOT NULL,
    `clerkUserId` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `organization_members_organizationId_idx`(`organizationId`),
    INDEX `organization_members_clerkUserId_idx`(`clerkUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organizationId` INTEGER NULL,
    `customerCode` VARCHAR(50) NOT NULL,
    `companyName` VARCHAR(255) NOT NULL,
    `displayName` VARCHAR(255) NULL,
    `parentCustomerId` INTEGER NULL,
    `locationName` VARCHAR(255) NULL,
    `isCorporateAccount` BOOLEAN NOT NULL DEFAULT false,
    `contactPerson` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `alternatePhone` VARCHAR(50) NULL,
    `website` VARCHAR(255) NULL,
    `gstNumber` VARCHAR(50) NULL,
    `gstType` ENUM('REGISTERED', 'UNREGISTERED', 'COMPOSITION', 'SEZ', 'EXPORT') NULL DEFAULT 'UNREGISTERED',
    `panNumber` VARCHAR(50) NULL,
    `billingAddress` TEXT NULL,
    `billingCity` VARCHAR(100) NULL,
    `billingState` VARCHAR(100) NULL,
    `billingPincode` VARCHAR(20) NULL,
    `billingCountry` VARCHAR(100) NULL DEFAULT 'India',
    `shippingAddress` TEXT NULL,
    `shippingCity` VARCHAR(100) NULL,
    `shippingState` VARCHAR(100) NULL,
    `shippingPincode` VARCHAR(20) NULL,
    `shippingCountry` VARCHAR(100) NULL DEFAULT 'India',
    `paymentTerms` VARCHAR(255) NULL,
    `creditLimit` DECIMAL(12, 2) NULL,
    `creditDays` INTEGER NULL DEFAULT 0,
    `openingBalance` DECIMAL(12, 2) NULL DEFAULT 0.00,
    `currentBalance` DECIMAL(12, 2) NULL DEFAULT 0.00,
    `customerType` VARCHAR(50) NULL,
    `industry` VARCHAR(100) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customers_customerCode_key`(`customerCode`),
    INDEX `customers_organizationId_idx`(`organizationId`),
    INDEX `customers_email_idx`(`email`),
    INDEX `customers_gstNumber_idx`(`gstNumber`),
    INDEX `customers_isActive_idx`(`isActive`),
    INDEX `customers_companyName_idx`(`companyName`),
    INDEX `customers_parentCustomerId_idx`(`parentCustomerId`),
    INDEX `customers_isCorporateAccount_idx`(`isCorporateAccount`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(50) NULL,
    `designation` VARCHAR(100) NULL,
    `department` VARCHAR(100) NULL,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,
    `isBilling` BOOLEAN NOT NULL DEFAULT true,
    `isShipping` BOOLEAN NOT NULL DEFAULT true,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `customer_contacts_customerId_idx`(`customerId`),
    INDEX `customer_contacts_isPrimary_idx`(`isPrimary`),
    INDEX `customer_contacts_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organizationId` INTEGER NULL,
    `invoiceNumber` VARCHAR(50) NOT NULL,
    `customerId` INTEGER NULL,
    `customerName` VARCHAR(255) NOT NULL,
    `customerEmail` VARCHAR(255) NOT NULL,
    `customerPhone` VARCHAR(50) NULL,
    `customerCompany` VARCHAR(255) NULL,
    `shippingContactName` VARCHAR(255) NULL,
    `shippingContactPhone` VARCHAR(50) NULL,
    `subtotal` DECIMAL(12, 2) NOT NULL,
    `total` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `type` ENUM('QUOTE', 'PROFORMA', 'INVOICE', 'CREDIT_NOTE', 'DEBIT_NOTE') NOT NULL DEFAULT 'QUOTE',
    `status` ENUM('DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'REJECTED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED') NOT NULL DEFAULT 'DRAFT',
    `paymentTerms` VARCHAR(255) NULL,
    `poReference` VARCHAR(100) NULL,
    `creditDays` INTEGER NULL DEFAULT 0,
    `dueDate` DATETIME(3) NULL,
    `paidAt` DATETIME(3) NULL,
    `notes` TEXT NULL,
    `termsAndConditions` TEXT NULL,
    `createdBy` VARCHAR(255) NULL,
    `sentAt` DATETIME(3) NULL,
    `viewedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `bankDetails` TEXT NULL,
    `billingAddress` TEXT NULL,
    `cgstAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `companyGstNumber` VARCHAR(50) NULL,
    `companyState` VARCHAR(100) NULL DEFAULT 'Telangana',
    `convertedFromQuoteId` INTEGER NULL,
    `customerGstNumber` VARCHAR(50) NULL,
    `customerState` VARCHAR(100) NULL,
    `discountAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `discountPercent` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `igstAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `leadId` INTEGER NULL,
    `opportunityId` INTEGER NULL,
    `otherCharges` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `paidAmount` DECIMAL(12, 2) NULL,
    `paymentMethod` VARCHAR(100) NULL,
    `placeOfSupply` VARCHAR(100) NULL,
    `roundOff` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `sgstAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `shippingAddress` TEXT NULL,
    `shippingCharges` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `totalTax` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,

    UNIQUE INDEX `invoices_invoiceNumber_key`(`invoiceNumber`),
    UNIQUE INDEX `invoices_convertedFromQuoteId_key`(`convertedFromQuoteId`),
    INDEX `invoices_organizationId_idx`(`organizationId`),
    INDEX `invoices_invoiceNumber_idx`(`invoiceNumber`),
    INDEX `invoices_customerId_idx`(`customerId`),
    INDEX `invoices_customerEmail_idx`(`customerEmail`),
    INDEX `invoices_leadId_idx`(`leadId`),
    INDEX `invoices_opportunityId_idx`(`opportunityId`),
    INDEX `invoices_status_idx`(`status`),
    INDEX `invoices_type_idx`(`type`),
    INDEX `invoices_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoiceId` INTEGER NOT NULL,
    `productId` INTEGER NULL,
    `itemName` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `hsnCode` VARCHAR(50) NULL,
    `quantity` DECIMAL(10, 2) NOT NULL,
    `unit` VARCHAR(50) NULL DEFAULT 'Nos',
    `unitPrice` DECIMAL(10, 2) NOT NULL,
    `discount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `discountType` VARCHAR(20) NULL DEFAULT 'percentage',
    `taxableAmount` DECIMAL(12, 2) NOT NULL,
    `gstRate` DECIMAL(5, 2) NOT NULL,
    `cgst` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `sgst` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `igst` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `total` DECIMAL(12, 2) NOT NULL,

    INDEX `invoice_items_invoiceId_idx`(`invoiceId`),
    INDEX `invoice_items_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leadId` INTEGER NULL,
    `opportunityId` INTEGER NULL,
    `type` ENUM('CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE', 'DEMO', 'FOLLOW_UP') NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `outcome` TEXT NULL,
    `scheduledAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'CANCELLED', 'RESCHEDULED') NOT NULL DEFAULT 'PENDING',
    `assignedTo` VARCHAR(255) NULL,
    `createdBy` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `activities_leadId_idx`(`leadId`),
    INDEX `activities_opportunityId_idx`(`opportunityId`),
    INDEX `activities_type_idx`(`type`),
    INDEX `activities_status_idx`(`status`),
    INDEX `activities_scheduledAt_idx`(`scheduledAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `symbol` VARCHAR(10) NOT NULL,
    `symbolNative` VARCHAR(10) NOT NULL,
    `decimalDigits` INTEGER NOT NULL DEFAULT 2,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `currencies_code_key`(`code`),
    INDEX `currencies_code_idx`(`code`),
    INDEX `currencies_isDefault_idx`(`isDefault`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(255) NOT NULL,
    `companyAddress` TEXT NULL,
    `companyCity` VARCHAR(100) NULL,
    `companyState` VARCHAR(100) NULL,
    `companyPincode` VARCHAR(20) NULL,
    `companyCountry` VARCHAR(100) NULL DEFAULT 'India',
    `companyPhone` VARCHAR(50) NULL,
    `companyEmail` VARCHAR(255) NULL,
    `companyWebsite` VARCHAR(255) NULL,
    `companyGstNumber` VARCHAR(50) NULL,
    `companyPanNumber` VARCHAR(50) NULL,
    `logoUrl` VARCHAR(500) NULL,
    `defaultCurrency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `defaultPaymentTerms` VARCHAR(255) NULL,
    `defaultCreditDays` INTEGER NULL DEFAULT 0,
    `defaultTermsConditions` TEXT NULL,
    `bankName` VARCHAR(255) NULL,
    `bankAccountNumber` VARCHAR(50) NULL,
    `bankIfscCode` VARCHAR(20) NULL,
    `bankBranch` VARCHAR(255) NULL,
    `invoicePrefix` VARCHAR(20) NULL DEFAULT 'INV',
    `quotePrefix` VARCHAR(20) NULL DEFAULT 'QT',
    `proformaPrefix` VARCHAR(20) NULL DEFAULT 'PI',
    `nextInvoiceNumber` INTEGER NULL DEFAULT 1,
    `nextQuoteNumber` INTEGER NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_terms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `days` INTEGER NOT NULL DEFAULT 0,
    `description` VARCHAR(255) NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `payment_terms_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units_of_measure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `units_of_measure_code_key`(`code`),
    INDEX `units_of_measure_code_idx`(`code`),
    INDEX `units_of_measure_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

