using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;
namespace Application.Activities
{
    public class Delete
    {
        
                public class Command : IRequest
                {
                    public Guid Id { get; set; }
                 
                }
        
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
        
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                        //handler logic goes here

                        var activity = await _context.Activities.FindAsync(request.Id);

                        if(activity == null){
                            throw new RestException(HttpStatusCode.NotFound, new {activity = "Not Found"});
                        }

                        _context.Remove(activity);

                        var sucess = await _context.SaveChangesAsync() > 0;
        
                        if(sucess) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
         
    }
}