import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create default organization
    const org = await prisma.organizations.upsert({
        where: { slug: 'werkfox-default' },
        update: {},
        create: {
            name: 'WerkFox',
            slug: 'werkfox-default',
            packageType: 'FULL_SUITE',
            email: 'mv@stacknex.io',
            country: 'India',
        },
    });

    console.log('Created organization:', org.name, '(ID:', org.id, ')');

    // Link Clerk users as members
    const clerkUsers = [
        { clerkUserId: 'user_38w7gfG7Vmo2BBc48EyaZmhqwV4', role: 'SUPER_ADMIN' }, // Mohan Vem - mv@stacknex.io
        { clerkUserId: 'user_38wAdVMIffs0p0nUDnPrVLMD42v', role: 'ADMIN' },       // The Sparrow - besparrowed@gmail.com
    ];

    for (const u of clerkUsers) {
        const existing = await prisma.organization_members.findFirst({
            where: { organizationId: org.id, clerkUserId: u.clerkUserId },
        });

        if (!existing) {
            await prisma.organization_members.create({
                data: {
                    organizationId: org.id,
                    clerkUserId: u.clerkUserId,
                    role: u.role,
                },
            });
            console.log('Added member:', u.clerkUserId, 'as', u.role);
        } else {
            console.log('Member already exists:', u.clerkUserId);
        }
    }

    console.log('Seed completed!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
